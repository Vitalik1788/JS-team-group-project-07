import API from './api-library';
import defaultImg from '../../images/default.jpg';
import starsRating from '../../javascript/stars-rating';
import { STORAGE_KEY } from '../../fetch/api_key';
import { validateGenres } from '../weekly-trends-genres';
import { openModalAboutFilm } from '../movieModal';

const libraryRef = document.querySelector('.library');
const btnLib = document.getElementById('loadMore');

const library = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
window.addEventListener('DOMContentLoaded', () => {
  // if(libraryRef) createLibraryMarkup(library);
  let totalElementInList = 0;
  let firstEl = 0;
  getLibrarylistInParts(library);
});

btnLib?.addEventListener('click', onLoadMoreClick);

function onLoadMoreClick() {
  firstEl += 9;
  totalElementInList += 9;
  getLibrarylistInParts(library);
}

let totalElementInList = 0;
let firstEl = 0;
function getLibrarylistInParts(libraryData) {
  const totalLiberyLength = libraryData.length;
  const libraryInParts = libraryData.slice(firstEl, firstEl + 9);

  if (totalLiberyLength - totalElementInList <= 9) {
    createLibraryMarkup(libraryInParts);
    btnLib?.classList.add('is-hidden');
  } else {
    createLibraryMarkup(libraryInParts);
    btnLib.classList.remove('is-hidden');
  }
}

export function handleFilm(e) {
  const id = e.target.dataset.id;

  if (e.target.hasAttribute('data-add')) {
    // btnLib.removeAttribute('data-add');
    // btnLib.setAttribute('data-remove', '');
    // btnLib.textContent = 'Remove from my library';
    setBtnProp(e.target, addOps);

    addFilmToLibrary(id);

    //
  } else if (e.target.hasAttribute('data-remove')) {
    e.target.removeAttribute('data-remove');
    e.target.setAttribute('data-add', '');
    e.target.textContent = 'Add to my library';

    deleteCardLibrary(id);
  }
}

const addOps = {
  addAttr: 'data-remove',
  removeAttr: 'data-add',
  btnText: 'Remove from my library',
};

function setBtnProp(el, props) {
  const { addAttr, removeAttr, btnText } = props;

  el.removeAttribute(removeAttr);
  el.setAttribute(addAttr, '');
  el.textContent = btnText;
}

/////// ПРОВЕРКА НАЛИЧИЯ ID В LOCAL STORAGE /////////

/////// ПОЛУЧЕНИЯ ОТ СЕРВЕРА ФИЛЬМА ПО ID ///////

async function getMovieById(id) {
  const responce = await API.getMoviById(id);
  return responce.data;
}

///// ФУНКЦИЯ ДОБАВЛЕНИЯ В LOCAL STORAGE ///////

export async function addFilmToLibrary(id) {
  const libraryList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const isAtLibrary = libraryList?.find(x => x.id === Number(id));

  if (isAtLibrary) return console.log('film is at list');

  const movieObj = await getMovieById(id);
  libraryList.push(movieObj);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(libraryList));
}

///// ФНКЦИЯ УДАЛЕНИЯ ИЗ LOCAL STORAGE ///////

export function deleteCardLibrary(id) {
  const libraryList = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const itemToDelete = libraryList.findIndex(film => film.id === Number(id));

  libraryList.splice(itemToDelete, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(libraryList));

  if (window.location.href.includes('library')) {
    libraryRef.innerHTML = '';
    createLibraryMarkup(libraryList);
    const modal = document.querySelector('[data-modal]');
    modal.classList.add('modal-film-is-hidden');
    document.body.classList.remove('body--modal-open');
  }
}

async function createLibraryMarkup(libraryInParts) {
  const genresData = JSON.parse(localStorage.getItem('genres'));

  if (libraryInParts.length === 0) {
    libraryRef.innerHTML = `<div class="library-info library-info-container">
                              <p class="library-info-text">
                                OOPS... <br> We are very sorry!<br>
                                You don’t have any movies in your library.
                              </p>
                               <a class="btn btn-search-movie" href="./catalog.html">Search movie</a>
                            </div>`;
  } else {
    const genreIds = libraryInParts.flatMap(movie =>
      movie.genres.map(genre => genre.id)
    );
    const genresPromise = validateGenres(genreIds, genresData);
    const genres = await genresPromise;

    const markup = await Promise.all(
      libraryInParts.map(async movie => {
        const imageSrc = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : `${defaultImg}`;

        return `<li class="card-item item" data-id="${movie.id}">
              <img class="film-poster" src="${imageSrc}" alt="${
          movie.original_title
        }" />
              <div class="overlay">
                <div class="film-info">
                  <p class="film-title">${
                    movie.original_title || movie.name
                  }</p>
                  <div class="film-details">
                    <span class="film-description">${genres} | ${
          new Date(movie.release_date).getFullYear() ||
          new Date(movie.first_air_date).getFullYear()
        }</span>
                    <div class="stars-container">${starsRating({
                      voteAverage: movie.vote_average,
                      isHero: false,
                    })}</div>            
                  </div>
                </div>
              </div>
            </li>`;
      })
    );

    // libraryRef.innerHTML += markup.join('');
    libraryRef.insertAdjacentHTML('beforeend', markup.join(''));

    const filmList = document.querySelector('.listListener');

    filmList.addEventListener('click', event => {
      const li = event.target.closest('.card-item');
      const movieId = li.getAttribute('data-id');
      openModalAboutFilm(movieId);
    });
  }
}
