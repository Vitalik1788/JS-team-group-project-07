import axios from 'axios';
// import { API_KEY } from '../fetch/api_keys';
import { API_BAERER } from '../api-service/api_keys';

const upcomingMoviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/upcoming',
  // params: { language: 'en-US', page: '1', region: 'UA' },
  headers: { Authorization: `Bearer ${API_BAERER}` },
});

export async function getUpcomingMovies() {
  const response = await upcomingMoviesApi.get();
  // console.log(response);
  return response.data.results;
}
