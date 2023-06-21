export default function handleBackground() {
  if (
    document
      .querySelector('.modal__backdrop')
      .classList.contains('modal__backdrop--hide')
  ) {
    document.body.removeAttribute('style');
  } else {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    // document.body.style.paddingRight = `${scrollBarWidth}px`;
  }
}
