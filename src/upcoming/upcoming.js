import debounce from 'lodash.debounce';
import { getUpcomingMovies } from './api-service';
import { careateUpcomingMarkup } from './create-upcoming-markup';
import { handleUpcomingImg } from './img-handler';
import { getRandomItem } from './helpers';
// import defaultImg from '../images/logo.png';

const upcomingEl = document.querySelector('.upcoming-card');

window.addEventListener('DOMContentLoaded', handleUpcoming);

async function handleUpcoming() {
  try {
    const upcomingMovies = await getUpcomingMovies();
    const randomMovie = getRandomItem(upcomingMovies);
    // console.log(randomMovie);
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
    console.error('error:', error);
    // updateUpcoming(failMarkup)
    ('ERR_BAD_REQUEST');
  }
}

function updateUpcoming(markup = '') {
  upcomingEl.innerHTML = markup;
}


