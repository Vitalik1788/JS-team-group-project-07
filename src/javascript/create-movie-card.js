import { refs } from './catalog/components/refs';
import defaultImg from '../images/default.jpg';
import starsRating from './stars-rating';
import { validateGenres } from './weekly-trends-genres';
import { openModalAboutFilm } from './movieModal';

export async function createMovieCard(data) {
  const genresData = JSON.parse(localStorage.getItem('genres'));

  const markupPromises = data.results.map(async data => {
    const {
      poster_path,
      id,
      release_date,
      genre_ids,
      vote_average,
      original_title,
      original_name,
      first_air_date,
    } = data;
    const imageSrc = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : `${defaultImg}`;
    const genres = validateGenres(genre_ids, genresData);
    // const genres = await genresPromise;
    return `<li class="card-item" data-id="${id}">
        <img class="film-poster" src="${imageSrc}" alt="${
      original_title || original_name
    }" />
        <div class="overlay">
          <div class="film-info">
            <p class="film-title">${original_title || original_name}</p>
            <div class="film-details">
              <span class="film-description">${genres} | ${
      new Date(release_date).getFullYear() ||
      new Date(first_air_date).getFullYear()
    }</span>
    <div class="stars-container">${starsRating({
      voteAverage: vote_average,
      isHero: false,
    })}</div>            
      <!-- <span class="film-rating">${vote_average.toFixed(1)}</span> -->
            </div>
          </div>
        </div>
      </li>`;
  });

  const markup = await Promise.all(markupPromises);

  refs.catalogList.innerHTML = markup.join('');

  const filmList = document.querySelector('.listListener');

  filmList.addEventListener('click', event => {
    const li = event.target.closest('.card-item');
    const movieId = li.getAttribute('data-id');
    openModalAboutFilm(movieId);
  });
}
