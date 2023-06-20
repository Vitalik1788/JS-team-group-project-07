import { validateGenres } from './weekly-trends-genres';
import starsRating from '../stars-rating';
import { GENRES_KEY } from '../api-service/api_keys';

export function createMarkup(films) {
  const storage = JSON.parse(localStorage.getItem(GENRES_KEY));

  return films
    .map(
      ({ id, poster_path, release_date, title, genre_ids, vote_average }) => {
        const genres = validateGenres(genre_ids, storage);
        const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;

        let releaseDate = '';
        if (release_date === 'undefind') {
          releaseDate = 'Date unknown';
        } else {
          releaseDate = release_date.split('-')[0];
        }

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
                </div>
              </div>
            </div>
          </li>`;
      }
    )
    .join('');
}

export function insertMarkup(inputPlace, markup) {
  if (inputPlace) {
    inputPlace.innerHTML = markup;
  }
}
