import handleBackground from './handleBackground';

const refs = {
  modal: document.querySelector('.modal__backdrop'),
};

window.addEventListener('keydown', e => {
  if (e.code === 'KeyM') {
    refs.modal.classList.toggle('modal__backdrop--hide');
    handleBackground();
  }
});
