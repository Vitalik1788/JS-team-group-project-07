import defaultImg from '../../images/default.jpg';
import { validateGenres } from './weekly-trends-genres';
import starsRating from '../stars-rating';
import { GENRES_KEY } from '../api-service/api_keys';

export function createMarkup(films) {
  const storage = JSON.parse(localStorage.getItem(GENRES_KEY));

  return films
    .map(
      ({
        poster_path,
        id,
        release_date,
        genre_ids,
        vote_average,
        original_title,
        original_name,
        first_air_date,
      }) => {
        const genres = validateGenres(genre_ids, storage);
        const imageSrc = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : `${defaultImg}`;

        return `<li class="card-item item" data-id="${id}">
            <img class="film-poster" src="${imageSrc}" alt="${
          original_title || original_name
        } poster" />
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
                </div>
              </div>
            </div>
          </li>`;
      }
    )
    .join('');
}

export function insertMarkup(inputPlace, markup = '') {
  if (inputPlace) {
    inputPlace.innerHTML = markup;
  }
}
