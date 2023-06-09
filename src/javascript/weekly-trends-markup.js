import { validateGenres } from './weekly-trends-genres';
import starsRating from './stars-rating';
import { openModalAboutFilm } from './movieModal';

export function createMarkup(films) {
  const markup = films.map(
      ({ id, poster_path, release_date, title, genre_ids, vote_average }) => {
        const genres = validateGenres(
          genre_ids,
          JSON.parse(localStorage.getItem('genres'))
        );
        const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;

        let releaseDate = '';
        if (release_date === 'undefind') {
          releaseDate = 'Date unknown';
        } else {
          releaseDate = release_date.split('-')[0];
        }

        //const genres = await genresPromise;

        return `<li class="card-item item" data-id="${id}">
            <img class="film-poster" src="https://image.tmdb.org/t/p/original/${posterPath}" alt="${title} poster" />
            <div class="overlay">
              <div class="film-info">
                <p class="film-title">${title}</p>
                <div class="film-details">
                  <span class="film-description">${genres} | ${releaseDate}</span>
                  <div class="stars-container">${starsRating({
                    voteAverage: vote_average,
                    isHero: false,
                  })}</div>
									<!-- <span class="film-rating">${vote_average}</span> -->
                </div>
              </div>
            </div>
          </li>`;
      }
    ).join('');

  document.querySelector('.cards-list').insertAdjacentHTML('beforeend', markup);

  
}

const filmList = document.querySelector('.listListener');

filmList.addEventListener('click', event => {
  const li = event.target.closest('.card-item');

  const movieId = li.getAttribute('data-id');
  openModalAboutFilm(movieId)
})