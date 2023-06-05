import axios from 'axios';
import debounce from 'lodash.debounce';
// import { API_KEY } from '../fetch/api_key';
import { API_BAERER } from '../../fetch/api_key';
import { careateUpcomingMarkup } from './create-upcoming-markup';
// import defaultImg from '../images/logo.png';

const upcomingEl = document.querySelector('.upcoming-card');

window.addEventListener('DOMContentLoaded', handleUpcoming);

async function handleUpcoming() {
  try {
    const upcomingMovies = await getUpcomingMovies();
    // console.log(upcomingMovies);
    const randomMovie = getRandomItem(upcomingMovies);
    console.log(randomMovie);
    const markup = careateUpcomingMarkup(randomMovie);
    updateUpcoming(markup);
    // handleUpcomingImg(randomMovie);

    const debouncedImgHandler = debounce(
      () => handleUpcomingImg(randomMovie),
      200
    );

    window.addEventListener('resize', debouncedImgHandler);

    //
  } catch (error) {
    console.log('error:', error);
    console.log('error code:', error.code);

    // updateUpcoming(failMarkup)
    ('ERR_BAD_REQUEST');
  }
}

function handleUpcomingImg({ poster_path, backdrop_path, title }) {
  // const imgContainerEl = document.querySelector('.upcoming-card__figure');
  // if (!imgContainerEl) return console.log('no upcoming section');

  // const imgIsPresent = imgContainerEl.firstElementChild?.nodeName === 'IMG';
  // console.log(imgIsPresent);

  const mediaWidth = window.matchMedia('(max-width: 767px)');
  // mediaWidth.onchange(() => console.log('change media'));
  // console.log(mediaWidth);

  const img = document.querySelector('.upcoming-card__img');
  if (!img) return console.log('no upcoming section');

  const posterLink = `https://image.tmdb.org/t/p/original${poster_path}`;
  const backdropLink = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  if (window.screen.width < 768 && img.src !== posterLink) {
    return (img.src = posterLink);
  }

  if (window.screen.width >= 768 && img.src !== backdropLink) {
    return (img.src = backdropLink);
  }

  // if (imgIsPresent && !mediaWidth.matches) {
  //   clearElement(imgContainerEl);
  // }

  // if (imgIsPresent) return;

  // if (mediaWidth.matches) {
  //   const img = document.createElement('img');

  //   const link = poster_path
  //     ? `https://image.tmdb.org/t/p/original${poster_path}`
  //     : defaultImg;

  //   img.src = link;
  //   img.alt = title;
  //   img.loading = 'lazy';
  //   img.classList.add('upcoming-card__poster');

  //   console.log(img);
  //   imgContainerEl.append(img);
  // }
}

function checkMedia(url) {
  x = window.matchMedia('(max-width: 767px)');
  if (x.matches) return console.log(url);
  console.log('more');
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
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
  // console.log(response);
  return response.data.results;
}
