import debounce from 'lodash.debounce';

const scrollUpBtn = document.querySelector('.scroll-up__container');
const pointOfVisibility = 300;

window.addEventListener('scroll', debounce(handleScrollUp, 250));
scrollUpBtn.addEventListener('click', scrollToTop);

function handleScrollUp() {
  if (window.pageYOffset >= pointOfVisibility) {
    scrollUpBtn.classList.add('scroll-up__container--shown');
  } else {
    scrollUpBtn.classList.remove('scroll-up__container--shown');
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}
