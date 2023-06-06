import MovieDetailProviver from './movieDetailProvider.js';
import { API_KEY } from '../fetch/api_key';

const movieDetailProviver = new MovieDetailProviver(API_KEY);
let modalInstance = null;

class MovieModal {
  constructor() {
    if (modalInstance !== null)
      return modalInstance;

    this.body = document.querySelector('body');
    this.body.insertAdjacentHTML('beforeend', instanceModalHTML());
    this.refs = {
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

    this.refs.modalCloseBtn.addEventListener('click', () => this.hide());
    document.addEventListener('keydown', event => event.key === 'Escape' ? this.hide() : null);
    window.addEventListener('click', event => event.target === this.refs.modal ? this.hide() : null);

    modalInstance = this;
  }

  show() {
    this.refs.modal.classList.remove('modal-film-is-hidden');
    this.body.classList.add('body--modal-open');
  }

  hide() {
    this.refs.modal.classList.add('modal-film-is-hidden');
    this.body.classList.remove('body--modal-open');
  }

  refreshData(data) {
    this.refs.posterPath.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    this.refs.title.textContent = `${data.title}`;
    this.refs.voteAverage.textContent = `${Number(data.vote_average.toFixed(1))}`;
    this.refs.voteCount.textContent = `${data.vote_count}`;
    this.refs.popularity.textContent = `${Number(data.popularity.toFixed(1))}`;
    this.refs.genre.textContent = `${data.genres.map(genre => genre.name).join(', ')}`;
    this.refs.description.textContent = `${data.overview}`;
  }
}

//use this method to open a modal.
export function openModalAboutFilm(movieId) {
  const modal = new MovieModal();
  movieDetailProviver
    .getMovieDetails(movieId)
    .then(response => {
      modal.refreshData(response.data);
      modal.show();
    })
    .catch(error => {
      console.error(error);
    });
}

function instanceModalHTML() {
  return `
  <div class="modal-info-film-backdrop modal-film-is-hidden" data-modal>
    <div class="modal-about-film">
      <button type="button" class="modal__close-btn" data-modal-close>
        <svg class="modal__close-icon" width="30" height="30" aria-label="Close">
          <use href="./images/Modal-Close.svg#close"></use>
        </svg>
      </button>
      <div class="modal-film-info-wrapper">
        <div class="modal-wrapper-img">
          <img
            class="modal-film-img"
            id="modal-film-poster-path"
            src=""
            alt=""
          />
        </div>
        <div class="film-text-info-wrapper">
          <h3 class="modal-film-title" id="modal-film-title"></h3>
          <ul class="modal-film-info-list">
            <li class="modal-film-info-item">
              <p class="modal-film-info-label">Vote / Votes</p>
              <p class="modal-film-info-desc">
                <span
                  class="desc-voted desc-vote-average"
                  id="modal-film-vote-average"
                ></span>
                /
                <span
                  class="desc-voted desc-votes-count"
                  id="modal-film-vote-count"
                ></span>
              </p>
            </li>
            <li class="modal-film-info-item">
              <p class="modal-film-info-label">Popularity</p>
              <p class="modal-film-info-desc" id="modal-film-popularity"></p>
            </li>
            <li class="modal-film-info-item">
              <p class="modal-film-info-label">Genre</p>
              <p
                class="modal-film-info-desc film-info__desc--normal-text"
                id="modal-film-genre"
              ></p>
            </li>
          </ul>
          <p class="modal-film-info-label">ABOUT</p>
          <div class="container-film-descr">
            <p class="modal-film__description" id="modal-film-description"></p>
          </div>
          <button class="modal-btn-add-libr"  type="button"><span class="btn-mod-text">Add to my library</span> </button>
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}