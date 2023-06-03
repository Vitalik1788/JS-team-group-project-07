import MovieDetailProviver from './movieDetailProvider.js';

const KEY_API = 'dd027d4f0ede6cde1462c11a8aff31fd';
const movieDetailProviver = new MovieDetailProviver(KEY_API);
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
};
refs.modalOpenBtn.addEventListener('click', () => openModal(5));

refs.modalCloseBtn.addEventListener('click', hide);
document.addEventListener('keydown', event =>
  event.key === 'Escape' ? hide() : null
);
window.addEventListener('click', event =>
  event.target === refs.modal ? hide() : null
);

function openModal(movieId) {
  movieDetailProviver
    .getMovieDetails(movieId)
    .then(response => {
      const movie = response.data;

      refs.posterPath.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      refs.title.textContent = `${movie.title}`;
      refs.voteAverage.textContent = `${Number(movie.vote_average.toFixed(1))}`;
      refs.voteCount.textContent = `${movie.vote_count}`;
      refs.popularity.textContent = `${Number(movie.popularity.toFixed(1))}`;
      refs.genre.textContent = `${movie.genres
        .map(genre => genre.name)
        .join(', ')}`;
      refs.description.textContent = `${movie.overview}`;

      updateState();
      show();
    })
    .catch(error => {
      console.error(error);
    });
}

function show() {
  refs.modal.classList.remove('is-hidden');
  refs.body.classList.add('body--modal-open');
}

function hide() {
  refs.modal.classList.add('is-hidden');
  refs.body.classList.remove('body--modal-open');
}

function addToLibrary() {

    updateState();
}

function removeFromLibrary() {

    updateState();
}

function updateState() {

}
