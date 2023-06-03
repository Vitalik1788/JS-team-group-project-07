import axios from 'axios';
import debounce from 'lodash.debounce';
// import { API_KEY } from '../fetch/api_key';
import { API_BAERER } from '../fetch/api_key';

const upcomingEl = document.querySelector('.upcoming');

window.addEventListener('DOMContentLoaded', handleUpcoming);

async function handleUpcoming() {
  try {
    const upcomingMovies = await getUpcomingMovies();
    console.log(upcomingMovies);

    const randomMovie = getRandomItem(upcomingMovies);
    console.log(randomMovie);

    const markup = careateUpcomingMarkup(randomMovie);
    updateUpcoming(markup);
    handlePosterImg(randomMovie);

    //
    // const imgContainerEl = document.querySelector('.upcoming__img-container');
    window.addEventListener(
      'resize',
      debounce(() => handlePosterImg(randomMovie), 200)
    );

    //
  } catch (error) {
    console.log('error:', error);
    console.log('error code:', error.code);

    // updateUpcoming(failMarkup)
    ('ERR_BAD_REQUEST');
  }
}

function careateUpcomingMarkup(film) {
  const { backdrop_path, poster_path, title } = film;

  const fragment = document.createDocumentFragment();

  try {
    //
  } catch (error) {
    console.log(error);
  }

  //
  return `
          <h3>${title}</h3>
          <div
            class='upcoming__img-container'
            style='
              background-image: linear-gradient(307.47deg, rgba(0, 0, 0, 0.2) 23.85%,
                rgba(0, 0, 0, 0) 47.27%),
                url(https://image.tmdb.org/t/p/original${backdrop_path});
              '

            >
          </div>
          `;
}

function handlePosterImg({ poster_path, title }) {
  const imgContainerEl = document.querySelector('.upcoming__img-container');
  if (!imgContainerEl) return console.log('no upcoming section');

  const imgIsPresent = imgContainerEl.firstElementChild?.nodeName === 'IMG';
  console.log(imgIsPresent);

  const mediaWidth = window.matchMedia('(max-width: 767px)');
  // mediaWidth.onchange(() => console.log('change media'));
  // console.log(mediaWidth);

  if (imgIsPresent && !mediaWidth.matches) clearElement(imgContainerEl);

  if (imgIsPresent) return;

  if (mediaWidth.matches) {
    const img = document.createElement('img');

    img.src = `https://image.tmdb.org/t/p/original${poster_path}`;
    img.alt = title;
    img.classList.add('upcoming__poster');

    console.log(img);
    imgContainerEl.append(img);
  }
}

function checkMedia(url) {
  x = window.matchMedia('(max-width: 767px)');
  if (x.matches) return console.log(url);
  console.log('more');
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function clearElement(elem) {
  elem.innerHTML = '';
}

function updateUpcoming(markup = '') {
  upcomingEl.innerHTML = markup;
}

const upcomingMoviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/upcoming',
  // params: { language: 'en-US', page: '1', region: 'UA' },
  headers: { Authorization: `Bearer ${API_BAERER}` },
});

async function getUpcomingMovies() {
  const response = await upcomingMoviesApi.get();
  console.log(response);
  return response.data.results;
}

async function getOriginalimages(params) {
  //
  'https://image.tmdb.org/t/p/original/${film.backdrop_path})';
}
