import { openModalAboutFilm } from './movieModal';
// import { playTrailer } from './modal-trailer';

window.addEventListener('click', ({ target }) => {
  const heroDetailsButton = document.querySelector('.css-bnt-info');
  const watchTrailerButton = document.querySelector('.watch-trailer-button');

  const id = target.dataset.id;

  switch (target) {
    case heroDetailsButton:
      openModalAboutFilm(id);
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
