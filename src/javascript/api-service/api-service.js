import axios from 'axios';
import { API_KEY } from './api_keys';

// all apis here

export async function getTrendyFilms() {
  const films = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
  );
  return films;
}

export async function getGenresData() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
}
