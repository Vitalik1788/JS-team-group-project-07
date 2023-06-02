import axios from 'axios';
// import { API_KEY } from '../fetch/api_key';
import { API_BAERER } from '../fetch/api_key';

const upcomingEl = document.querySelector('.upcoming');

window.addEventListener('DOMContentLoaded', handleUpcoming);

async function handleUpcoming() {
  try {
    const upcomingMovies = await getUpcoming();
    console.log(upcomingMovies);

    const randomMovie = getRandom(upcomingMovies);
    console.log(randomMovie);

    const markup = careateMarkup(randomMovie);
    updateUpcoming(markup);
    //
  } catch (error) {
    console.log(error);
    console.log(error.code);

    // updateUpcoming(failMarkup)
    ('ERR_BAD_REQUEST');
  }
}

function careateMarkup(item) {
  console.log('inside careateMarkup');
  //
  return '<div></div>';
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function updateUpcoming(markup = '') {
  upcomingEl.innerHTML = markup;
}

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/upcoming',
  params: { language: 'en-US', page: '1', region: 'UA' },
  headers: {
    // Authorization: `Bearer ${API_KEY}`,
    Authorization: `Bearer ${API_BAERER}`,
  },
});

async function getUpcoming() {
  const response = await instance.get();
  console.log(response);
  return response.data.results;
}
