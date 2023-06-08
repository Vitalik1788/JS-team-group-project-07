const loaderEl = document.querySelector('.loader');

loaderInit();

window.onload = () => {
  loaderEl.classList.remove('loader--shown');
  document.body.removeAttribute('style');
};

function loaderInit() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  // loaderEl.classList.add('loader--shown');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarWidth}px`;
}
