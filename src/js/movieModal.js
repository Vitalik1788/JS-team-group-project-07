import MovieDetailProviver from './movieDetailProvider.js';
import { API_KEY } from '../fetch/api_key';

const movieDetailProviver = new MovieDetailProviver(API_KEY);

const refs = {
  body: document.querySelector('body'),
  modal: document.querySelector('[data-modal]'),
  modalCloseBtn: document.querySelector('[data-modal-close]'),
  posterPath: document.querySelector('#modal-film-poster-path'),
  title: document.querySelector('#modal-film-title'),
  voteAverage: document.querySelector('#modal-film-vote-average'),
  voteCount: document.querySelector('#modal-film-vote-count'),
  popularity: document.querySelector('#modal-film-popularity'),
  genre: document.querySelector('#modal-film-genre'),
  description: document.querySelector('#modal-film-description'),
  modalOpenBtn: document.querySelector('#open-modal'),
  modalAddOrRemoveBtn: document.querySelector('#modal-film-add-or-rm'),
};

refs.modalCloseBtn.addEventListener('click', hide);
refs.modalAddOrRemoveBtn.addEventListener('click', addOrRemoveToLibrary);
document.addEventListener('keydown', event => event.key === 'Escape' ? hide() : null);
window.addEventListener('click', event => event.target === refs.modal ? hide() : null);

//use this method to open a modal.
function openModalAboutFilm(movieId) {
  movieDetailProviver
    .getMovieDetails(movieId)
    .then(response => {
      const movie = response.data;

      refs.posterPath.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      refs.title.textContent = `${movie.title}`;
      refs.voteAverage.textContent = `${Number(movie.vote_average.toFixed(1))}`;
      refs.voteCount.textContent = `${movie.vote_count}`;
      refs.popularity.textContent = `${Number(movie.popularity.toFixed(1))}`;
      refs.genre.textContent = `${movie.genres.map(genre => genre.name).join(', ')}`;
      refs.description.textContent = `${movie.overview}`;

      determinateBtnState();
      show();
    })
    .catch(error => {
      console.error(error);
    });
}

//only internal.
function show() {
  refs.modal.classList.remove('modal-film-is-hidden');
  refs.body.classList.add('body--modal-open');
}

function hide() {
  refs.modal.classList.add('modal-film-is-hidden');
  refs.body.classList.remove('body--modal-open');
}

//TODO: Remove the placeholder when adding a class for managing the movie library.
var libraryState = false;
function addOrRemoveToLibrary() {
  libraryState = !libraryState;
  determinateBtnState();
}

function determinateBtnState() {
  if (libraryState) {
    refs.modalAddOrRemoveBtn.textContent = "Add to my library";
  } else {
    refs.modalAddOrRemoveBtn.textContent = "Remove from my library";
  }
}
