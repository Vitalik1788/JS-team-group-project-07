import { openModalAboutFilm } from './movieModal';
import { handleFilm } from './library/library';
// import { playTrailer } from './modal-trailer';

window.addEventListener('click', (e) => {
  const heroDetailsButton = document.querySelector('.css-bnt-info');
  const watchTrailerButton = document.querySelector('.watch-trailer-button');
  // const addBtn = document.querySelector('[data-add]');
  // const removeBtn = document.querySelector('[data-remove]');
  const upcomingBtn = document.querySelector('.btn');


  const id = e.target.dataset.id;

  switch (e.target) {
    case heroDetailsButton:
      openModalAboutFilm(id);
      break;

    // case addBtn:
    //   handleFilm(e)
    //   break;

    case upcomingBtn:
    // case removeBtn:
      handleFilm(e)
      break;

    case watchTrailerButton:
      // const movieId = watchTrailerButton.getAttribute('trailer-id');
      // playTrailer(movieId);
      // trailerCb();
      break;

    default:
      break;
  }
});

function trailerCb() {
  const closeButton = document.querySelector('.close-button');
  const modal = document.getElementById('modal');

  document.addEventListener('keydown', event =>
    event.key === 'Escape' ? (modal.style.display = 'none') : null
  );

  window.addEventListener('click', event =>
    event.target === modal ? (modal.style.display = 'none') : null
  );

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
