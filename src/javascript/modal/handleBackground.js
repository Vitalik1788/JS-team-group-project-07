export default function handleBackground() {
  if (
    document
      .querySelector('.modal__backdrop')
      .classList.contains('modal__backdrop--hide')
  ) {
    document.body.removeAttribute('style');
  } else {
    document.body.style.overflow = 'hidden';
  }
}
