import { refs } from './catalog/components/refs';
import defaultImg from '../images/default.jpg';
import starsRating from './stars-rating';
import { validateGenres } from './weekly-trends-genres';
import { openModalAboutFilm } from './movieModal';

export async function createMovieCard(data) {
  const genresData = JSON.parse(localStorage.getItem('genres'));

  const markupPromises = data.results.map(async movie => {
    const imageSrc = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : `${defaultImg}`;
    const genresPromise = validateGenres(movie.genre_ids, genresData);
    const genres = await genresPromise;
    return `<li class="card-item" data-id="${movie.id}">
        <img class="film-poster" src="${imageSrc}" alt="${
      movie.original_title || movie.name
    }" />
        <div class="overlay">
          <div class="film-info">
            <p class="film-title">${movie.original_title || movie.name}</p>
            <div class="film-details">
              <span class="film-description">${genres} | ${
      new Date(movie.release_date).getFullYear() ||
      new Date(movie.first_air_date).getFullYear()
    }</span>
    <div class="stars-container">${starsRating({
      voteAverage: movie.vote_average,
      isHero: false,
    })}</div>            
      <!-- <span class="film-rating">${movie.vote_average.toFixed(1)}</span> -->
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
