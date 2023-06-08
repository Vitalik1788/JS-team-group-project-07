import { roundToTen, findFilmAtStorage } from './helpers';
import { STORAGE_KEY } from '../fetch/api_key';
import { validateGenres } from '../javascript/weekly-trends-genres';
export function careateUpcomingMarkup(film) {
  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    popularity,
    vote_count,
    vote_average,
    genre_ids,
    overview,
    id,
  } = film;

  const isSaved = findFilmAtStorage(STORAGE_KEY, id);
  // console.log('myIsSaved', isSaved);

  const btnAttribute = isSaved ? 'remove' : 'add';
  const btnText = isSaved ? 'Remove from my library' : 'Add to my library';
  //
  const imgPath = window.screen.width < 768 ? poster_path : backdrop_path;
  const transformedDate = release_date.replaceAll('-', '.');
  const roundedPopularity = roundToTen(popularity);

  // const trimedGenres = trimGenreList(['comedy', 'action', 'thriller']);

  // function trimGenreList(genres) {
  //   if (genres.length > 2) return `${genres.slice(0, 2).join(', ')}, ...`;
  //   else return `${genres.join(', ')}`;
  // }


  const genres = validateGenres(
    genre_ids,
    JSON.parse(localStorage.getItem('genres'))
  );
  //console.log(genresPromise)
  //const genres = await genresPromise;
  //const genres = Promise.resolve(genresPromise).then(result => result);
  //console.log(genres);

  return `
        <div class='upcoming-card__figure'>
          <div class='upcoming-card__layout'></div>
            <img
              src="https://image.tmdb.org/t/p/original${imgPath}"
              alt="${title}"
              loading='lazy'
              class='upcoming-card__img'
            > 
          </div>
        </div>
        <div class='upcoming-card__body'>
          <h3 class="upcoming-card__title">${title}</h3>
          <div class='metrics-list__main-container'>
            <ul class="list metrics-list">
              <li class="metrics-list__item">
                <p class="metrics-text">Release date</p>
                <p class="metrics-text metrics-text--date">${transformedDate}</p>
              </li>
              <li class="metrics-list__item">
                <p class="metrics-text">Vote / Votes</p>
                <p class="metrics-text metrics-text--vote">
                  <span class="vote-wrapper">${vote_average}</span>
                  /
                  <span class="vote-wrapper">${vote_count}</span>
                </p>
              </li>
              <li class="metrics-list__item">
                <p class="metrics-text">Popularity</p>
                <p class="metrics-text">${roundedPopularity}</p>
              </li>
              <li class="metrics-list__item">
                <p class="metrics-text">Genre</p>
                <p class="metrics-text">${genres}</p>
              </li>
            </ul>
          </div>
          <h4 class="upcoming-card__subtitle metrics-text">ABOUT</h4>
            <p class="upcoming-card__text">${overview}</p>
          <button class="btn" type="button" data-id=${id} data-${btnAttribute}>${btnText}</button>
        </div>`;
}
