import axios from 'axios';
import { API_KEY, API_BAERER } from './api_keys';

// all apis here

export async function getGenresData() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
}

// Get weekly trends

const TrendsMoviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { language: 'en-US', page: '1', api_key: API_KEY },
  // headers: { Authorization: `Bearer ${API_BAERER}` },
});

export async function getTrendyFilms(page) {
  let url = '/trending/all/week';

  const response = await TrendsMoviesApi.get(url, {
    params: {
      page,
    },
  });

  return response.data;
}

// Get searched catalog movies

const catalogSearchedMoviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { language: 'en-US', page: '1', query: '' },
  headers: { Authorization: `Bearer ${API_BAERER}` },
});

export async function getSearchedMovies(query, page) {
  let url = '/search/movie';

  const response = await catalogSearchedMoviesApi.get(url, {
    params: {
      query,
      page,
    },
  });

  return response.data;
}
