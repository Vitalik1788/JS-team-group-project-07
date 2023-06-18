import { onError } from './weekly-trends-main';
import axios from 'axios';
import { STORAGE_KEY, API_KEY } from '../api-service/api_keys';
export async function getGenres() {
  
  let genres = localStorage.getItem(STORAGE_KEY);
  if (!genres) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    genres - response.data.genres;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
  } else {
    genres = JSON.parse(genres);
  }
  return genres;
}

export function validateGenres(genresArray, genresData) {
  try {
    const allGenres = Array.from(genresData);
    const genresNames = genresArray.map(genreId => {
      const genre = allGenres.find(genre => genre.id === genreId);
      return genre ? genre.name : '';
    });
    return trimGenres(genresNames);
  } catch (error) {
    onError(error);
    return '';
  }
}
function trimGenres(genresArray) {
  let genresString = '';
  if (genresArray.length > 2) {
    genresString = genresArray.slice(0, 2).join(', ');
  } else {
    genresString = genresArray.join(', ');
  }
  return genresString;
}
