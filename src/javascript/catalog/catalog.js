import { refs } from './refs';
// import { getCatalogMovies } from './api_service';
import { getTrendyFilms, getSearchedMovies } from '../api-service/api-service';
import { createErrorMarkup } from './create-error-markup';
import { createMovieCard } from './create-movie-card';
import { createPagination } from './pagination';

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
cancelBtn.addEventListener('click', clearInputValue);

async function handleCatalogTrends() {
  try {
    const catalogMovies = await getTrendyFilms();
    createPagination('', catalogMovies);

    // console.log(catalogMovies);
    const movies = await createMovieCard(catalogMovies);

    updateCatalogMarkup(movies);
  } catch (error) {
    console.error('error:', error);
  }
}

async function handleSearchedMovies(query) {
  try {
    const searchedMovies = await getSearchedMovies(query);
    createPagination('', searchedMovies);

    const movies = await createMovieCard(searchedMovies);

    updateCatalogMarkup(movies);
  } catch (error) {}
}

export function updateCatalogMarkup(markup = '') {
  catalogList.innerHTML = markup.join('');
}

function updateErrorMarkup(markup = '') {
  errorContainer.innerHTML = markup;

  toggleErrorContainer();

  clearCatalogList();
}

function getQuery() {
  const query = searchInput.value.trim();
  return query;
}

function handleError(error) {
  clearCatalogList();

  createErrorMarkup();
  console.error('An error occurred:', error);
}

function onSubmit(e) {
  e.preventDefault();

  handleSearchedMovies(getQuery());
}

function handleEmptyQuery() {
  clearCatalogList();

  toggleErrorContainer();
  paginationContainer.classList.add('is-hidden');
  createErrorMarkup();
}

function onInput(e) {
  if (e.currentTarget.value.trim()) return toggleCancelButton();

  toggleCancelButton();
}

function clearInputValue() {
  toggleCancelButton();
  searchInput.value = '';
}

function toggleErrorContainer() {
  errorContainer.classList.toggle('is-hidden');
}

function toggleCancelButton() {
  cancelBtn.classList.toggle('is-hidden');
}

function hidePagination() {
  paginationContainer.classList.remove('is-hidden');
}

function clearCatalogList() {
  catalogList.innerHTML = '';
}
