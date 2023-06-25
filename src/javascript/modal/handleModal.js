import handleBackground from './handleBackground';

const modal = document.querySelector('.modal__backdrop');

window.addEventListener('keydown', e => {
  if (e.code === 'KeyM') {
    modal.classList.toggle('modal__backdrop--hide');
    handleBackground();
  }
});
