import axios from 'axios';
import { createMarkup } from './weekly-trends-markup.js';
// import { getGenres } from './weekly-trends-genres.js';
import { API_KEY } from '../api-service/api_keys.js';
import debounce from 'lodash.debounce';
window.addEventListener('DOMContentLoaded', showWeeklyTrends);
window.addEventListener(
  'resize',
  debounce(() => {
    document.querySelector('.cards-list').innerHTML = '';
    showWeeklyTrends();
  }, 200)
);
export async function showWeeklyTrends() {
  const numMovies = checkInnerWidth();
  //getGenres();
  try {
    const { data } = await getTrendyFilms();
    const films = data.results.slice(0, numMovies);
    createMarkup(films);
  } catch (error) {
    onError(error);
  }
}

function checkInnerWidth() {
  const screenWidth = window.innerWidth;
  return screenWidth < 768 ? 1 : 3;
}
async function getTrendyFilms() {
  const films = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
  );
  return films;
}

export function onError(error) {
  console.log(` error  ${error}`);
}
