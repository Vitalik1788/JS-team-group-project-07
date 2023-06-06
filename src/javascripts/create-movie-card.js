import { refs } from '../JS/catalog/components/refs';
import defaultImg from '../images/default.jpg';
import starsRating from '../JS/stars-rating';

export function createMovieCard(data) {
  const markup = data.results
    .map(movie => {
      const imageSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : `${defaultImg}`;

      return `<li class="card-item">
            <img class="film-poster" src="${imageSrc}" alt="${
        movie.original_title
      }" />
            <div class="overlay">
              <div class="film-info">
                <p class="film-title">${movie.original_title || movie.name}</p>
                <div class="film-details">
                  <span class="film-description">${[...movie.genre_ids]} | ${
        new Date(movie.release_date).getFullYear() ||
        new Date(movie.first_air_date).getFullYear()
      } </span>
      <div class="stars-container">${starsRating({
        voteAverage: movie.vote_average,
        isHero: false,
      })}</div>            
			<span class="film-rating">${movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </li>`;
    })
    .join('');

  refs.catalogList.innerHTML = markup;
}
