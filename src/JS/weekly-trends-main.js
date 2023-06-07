import axios from 'axios';
import './weekly-trends-markup.js';
import { createMarkup } from './weekly-trends-markup.js';
import { getGenres } from './weekly-trends-genres.js';
const refs = {
  trendsList: document.querySelector('.cards-list'),
};
//getGenres();
export function showWeeklyTrends() {
  const screenWidth = window.innerWidth;
  const numMovies = screenWidth < 768 ? 1 : 3;
  getGenres();
  getTrendyFilms().then(({ data }) => {
    const films = data.results.slice(0, numMovies);

    createMarkup(films)
    // .then(() => {
    //   console.log(data);
    // });
  });
}

async function getTrendyFilms() {
  try {
    const films = await axios.get(
      'https://api.themoviedb.org/3/trending/all/week?api_key=41b8f9437bf3f899281f8a3f9bdc0891'
    );

    return films;
  } catch (error) {
    onError(error);
  }
}

export function onError(error) {
  console.log(` error  ${error}`);
}