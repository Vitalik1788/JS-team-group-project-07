import axios from 'axios';
import { API_BAERER } from '../api-service/api_keys';

const catalogMoviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search/movie',
  params: { language: 'en-US', page: '1', region: 'UA' },
  headers: { Authorization: `Bearer ${API_BAERER}` },
});

export async function getCatalogMovies(query, page) {
  let url = query
    ? 'https://api.themoviedb.org/3/search/movie'
    : 'https://api.themoviedb.org/3/trending/all/day';

  const response = await catalogMoviesApi.get(url, {
    params: {
      query,
      page,
    },
  });

  return response.data;
}
