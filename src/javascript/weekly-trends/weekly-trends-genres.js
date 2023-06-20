import { onError } from './on-error';
// import axios from 'axios';
import { GENRES_KEY } from '../api-service/api_keys';
import { getGenresData } from '../api-service/api-service';

export async function getGenres() {
  
  let genres = localStorage.getItem(GENRES_KEY);
 
  if (!genres) {
    try {
      genres = await getGenresData();
    console.log(genres)
      localStorage.setItem(GENRES_KEY, JSON.stringify(genres));
    } catch (error) {
      
      onError(error);
    }
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
