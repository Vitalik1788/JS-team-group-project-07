import { openModalAboutFilm } from './modal/movieModal';
// import handleModal from './modal/modalInit';
import { handleFilm } from './library/library';
// import { playTrailer } from './modal-trailer';

window.addEventListener('click', e => {
  // const heroDetailsButton = document.querySelector('.css-bnt-info');
  // const watchTrailerButton = document.querySelector('.watch-trailer-button');
  // const addBtn = document.querySelector('[data-add]');
  // const removeBtn = document.querySelector('[data-remove]');
  // const upcomingBtn = document.querySelector('.btn');

  const id = e.target.dataset.id;
  // console.log(e.target.hasAttribute('trailer-id'));

  const isHeroDetailsButton = e.target.classList.contains('css-bnt-info');
  const IsTrailerButton = e.target.classList.contains('watch-trailer-button');
  const isFilmCard = Boolean(e.target.closest('.card-item'));
  // const isUpcomingBtn = e.target.classList.contains('btn');
  const isAddBtn = e.target.hasAttribute('data-add');
  const isDeleteBtn = e.target.hasAttribute('data-remove');

  switch (true) {
    case isHeroDetailsButton:
    case IsTrailerButton:
    case isFilmCard:
      openModalAboutFilm(id);
      // handleModal(e);
      break;

    // case isUpcomingBtn:
    case isAddBtn:
    case isDeleteBtn:
      // case upcomingBtn:
      // case removeBtn:
      handleFilm(e);
      break;

    // case watchTrailerButton:
    // const movieId = watchTrailerButton.getAttribute('trailer-id');
    // playTrailer(movieId);
    // trailerCb();
    // break;

    default:
      break;
  }
});
