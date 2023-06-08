import MovieDetailProviver from './movieDetailProvider.js';
import { roundToTen, findFilmAtStorage } from '../upcoming/helpers.js';
import { handleFilm } from './library/library.js';
import { API_KEY , STORAGE_KEY} from '../fetch/api_key';
import defaultImg from '../images/default.jpg';

// const STORAGE_KEY = 'my_film';
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
    this.refs.modalAddOrRemoveBtn.addEventListener('click', event=> handleFilm(event));
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
    this.refs.posterPath.src = data.poster_path? `https://image.tmdb.org/t/p/w500${data.poster_path}`:`${defaultImg}`;
    this.refs.title.textContent = `${data.title}`;
    this.refs.voteAverage.textContent = `${roundToTen(data.vote_average)}`;
    this.refs.voteCount.textContent = `${data.vote_count}`;
    this.refs.popularity.textContent = `${roundToTen(data.popularity)}`;
    this.refs.genre.textContent = `${data.genres.map(genre => genre.name).join(', ')}`;
    this.refs.description.textContent = `${data.overview}`;
  }

  refreshBtn(movieId, btnAttribute, btnText){
    this.refs.modalAddOrRemoveBtn.setAttribute('data-id', movieId);
    this.refs.modalAddOrRemoveBtn.setAttribute('data-'+btnAttribute,'');
    this.refs.modalAddOrRemoveBtn.textContent = btnText;
  }
}

//use this method to open a modal.
export function openModalAboutFilm(movieId) {
  const modal = new MovieModal();
  
  const isSaved = findFilmAtStorage(STORAGE_KEY, movieId)
  const btnAttribute = isSaved ? 'remove' : 'add';
  const btnText = isSaved ? 'Remove from my library' : 'Add to my library';

  movieDetailProviver
    .getMovieDetails(movieId)
    .then(response => {
      modal.refreshData(response.data);
      modal.refreshBtn(movieId, btnAttribute, btnText);

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
          <path d="M18 6L6 18M6 6L18 18"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="modal-film-info-wrapper">
        <div class="modal-wrapper-img">
          <img
            class="modal-film-img"
            id="modal-film-poster-path"
            src="https://organisasi.kalbarprov.go.id/assets/images/no_image.png"
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
          <button class="modal-btn-add-libr"  type="button" id="modal-film-add-or-rm">Add to my library</button>
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}