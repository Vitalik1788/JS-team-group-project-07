import starsRating from './stars-rating';
import { getMovieId } from './modal-trailer';

const API_KEY = '58fde9f9a3392c3dbee86a1f2142354e';
const RANDOM_NUMBER = Math.floor(Math.random() * (19 - 0 + 1)) + 0;
const axios = require('axios').default;

const refs = {
  heroDiv: document.getElementById('hero-div'),
  heroTitle: document.getElementById('hero-title'),
  heroOverview: document.getElementById('hero-overview'),
  heroBtnDiv: document.getElementById('hero-btn-div'),
  heroFilmDataEl: document.querySelector('.hero-info-wrap'), //це елемент, на який вішаються дата-атрибути ID та vote_average
};

window.addEventListener('load', heroInfoShow);

function heroInfoShow() {
  getFilmInfo().then(({ data }) => {

    // Змінні усієї інформації фільму
    const filmInfo = data.results[RANDOM_NUMBER];
    const filmPicturePath = filmInfo.backdrop_path;
    const filmPictureUrl = `"https://image.tmdb.org/t/p/original/${filmPicturePath}"`;
    const filmName = filmInfo.title;
    const filmOverview = filmInfo.overview;
    const filmId = filmInfo.id;
    const filmRating = filmInfo.vote_average;

    createHeroMarkUp(filmPictureUrl, filmName, filmOverview); //функція розмітки hero
    createSuccessFetchBtnMurkUp(filmId); // функція додавання кнопок при успішному запиту
    createDataSet(filmId, filmRating); // функція додавання дата-атрибутів при успішному запиту для трейлеру, зірочок рейтингу і таке інше

    starsRating({ voteAverage: filmRating, isHero: true });
  });
}

//базовий фетч function getFilmInfo() {
//   return fetch(
//     'https://api.themoviedb.org/3/trending/movie/day?api_key=58fde9f9a3392c3dbee86a1f2142354e'
//   ).then(res => res.json());
// }

async function getFilmInfo() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );

    return res;
  } catch (error) {
    onHeroFetchError(error);
  }
}

//базова розмітка при успішному запиту
function createHeroMarkUp(picturePath, filmName, filmDescription) {
  refs.heroDiv.style.backgroundImage = `linear-gradient(79.39deg, #111111 32.37%, rgba(17, 17, 17, 0) 72.02%), 
  url(${picturePath})`;
  refs.heroTitle.textContent = `${filmName}`;
  refs.heroOverview.textContent = `${filmDescription}`;
}

//базова розмітка при помилці
function onHeroFetchError(err) {
  refs.heroDiv.classList.add('hero-container-bg');

  const heroDefaultImage = `../images/default-bgimage.jpg`;
  const heroDefaultName = `Let’s Make Your Own Cinema`;
  const heroDefaultOverview = `Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.`;

  createHeroMarkUp(heroDefaultImage, heroDefaultName, heroDefaultOverview);
  createDefaultBtnMarkUp();
}

// функція додавання кнопки при помилці запиту
function createDefaultBtnMarkUp() {
  const heroDefaultBtn = document.createElement('button');
  heroDefaultBtn.textContent = 'Get Started';
  heroDefaultBtn.classList.add('css-btn-trailer');
  heroDefaultBtn.setAttribute('type', 'button');
  refs.heroBtnDiv.append(heroDefaultBtn);
}

//функція додавання кнопок при успішному запиту
function createSuccessFetchBtnMurkUp(filmId) {
  const heroTrailertBtn = document.createElement('button');
  heroTrailertBtn.textContent = 'Watch Trailer';
  heroTrailertBtn.classList.add('css-btn-trailer', 'watch-trailer-button');
  heroTrailertBtn.setAttribute('type', 'button');
  heroTrailertBtn.setAttribute('trailer-id', `${filmId}`);

  refs.heroBtnDiv.append(heroTrailertBtn);

  const heroDetailstBtn = document.createElement('button');
  heroDetailstBtn.textContent = 'More Details';
  heroDetailstBtn.classList.add('css-bnt-info');
  heroDetailstBtn.setAttribute('type', 'button');
  heroDetailstBtn.setAttribute('data-id', filmId);

  refs.heroBtnDiv.append(heroDetailstBtn);
}

//функція для створення дата-атрибутів для використання
function createDataSet(id, rating) {
  refs.heroFilmDataEl.dataset.id = id;
  refs.heroFilmDataEl.dataset.rating = rating;
}
