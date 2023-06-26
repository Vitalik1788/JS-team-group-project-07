import { refs } from './refs';
import { getTrendyFilms, getSearchedMovies } from '../api-service/api-service';
import { createErrorMarkup } from './create-error-markup';
import { createPagination } from './pagination';
import {
  createMarkup,
  insertMarkup,
} from '../weekly-trends/weekly-trends-markup';

const {
  searchForm,
  searchInput,
  catalogList,
  errorContainer,
  cancelBtn,
  paginationContainer,
} = refs;

window.addEventListener('DOMContentLoaded', () => {
  handleCatalogTrends();
});

searchForm.addEventListener('submit', onSubmit);

async function handleCatalogTrends() {
  try {
    const catalogMovies = await getTrendyFilms();
    createPagination('', catalogMovies);

    const movies = createMarkup(catalogMovies.results);

    insertMarkup(catalogList, movies);
  } catch (error) {
    console.error('error:', error);
  }
}

async function handleSearchedMovies(query) {
  try {
    const searchedMovies = await getSearchedMovies(query);
    createPagination('', searchedMovies);

    const movies = createMarkup(searchedMovies.results);

    insertMarkup(catalogList, movies);
  } catch (error) {}
}

function getQuery() {
  const query = searchInput.value.trim();
  return query;
}

function onSubmit(e) {
  e.preventDefault();

  handleSearchedMovies(getQuery());
}
// function handleError(error) {
//   clearCatalogList();

//   createErrorMarkup();
//   console.error('An error occurred:', error);
// }

// function handleEmptyQuery() {
//   clearCatalogList();

//   toggleErrorContainer();
//   paginationContainer.classList.add('is-hidden');
//   createErrorMarkup();
// }

// function onInput(e) {
//   if (e.currentTarget.value.trim()) return toggleCancelButton();

//   toggleCancelButton();
// }

// function clearInputValue() {
//   toggleCancelButton();
//   searchInput.value = '';
// }

// function toggleErrorContainer() {
//   errorContainer.classList.toggle('is-hidden');
// }

// function toggleCancelButton() {
//   cancelBtn.classList.toggle('is-hidden');
// }

// function hidePagination() {
//   paginationContainer.classList.remove('is-hidden');
// }

// function clearCatalogList() {
//   catalogList.innerHTML = '';
// }
