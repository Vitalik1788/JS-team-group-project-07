/** @format */
// Mobile-menu
const mobileMenuButton = document.getElementById('menu');
const menuNav = document.querySelector('nav');
const overlay = document.getElementById('overlay');
const body = document.querySelector('body');

mobileMenuButton.addEventListener('click', () => {
  menuNav.style.left = '0';
  overlay.style.display = 'block';
  body.style.overflow = 'hidden';
});

overlay.addEventListener('click', () => {
  menuNav.style.left = '-64%';
  overlay.style.display = 'none';
  body.style.overflow = 'auto';
});
// Theme

const LightSwitcher = document.querySelector('.switcher');
let isLight = localStorage.getItem('isLight') === 'true';

document.body.classList.toggle('light', isLight);

LightSwitcher.onclick = function () {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  localStorage.setItem('isLight', isLight);
};
