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
  pagination,
} = refs;

window.addEventListener('DOMContentLoaded', () => {
  handleCatalogTrends();
});

searchForm.addEventListener('submit', onSubmit);
searchInput.addEventListener('input', onInput);
cancelBtn.addEventListener('click', onCancelBtn);

async function handleCatalogTrends() {
  try {
    const catalogMovies = await getTrendyFilms();
    createPagination('', catalogMovies);

    const movies = createMarkup(catalogMovies.results);

    insertMarkup(catalogList, movies);
  } catch (error) {
    handleErrorMarkup(errorContainer, createErrorMarkup());
  }
}

async function handleSearchedMovies(query) {
  try {
    if (query === '')
      return handleErrorMarkup(errorContainer, createErrorMarkup());

    const searchedMovies = await getSearchedMovies(query);

    // console.log(searchedMovies.total_pages );

    createPagination('', searchedMovies);

    if (searchedMovies.results.length === 0)
      return handleErrorMarkup(errorContainer, createErrorMarkup());

    hideError();

    const movies = createMarkup(searchedMovies.results);

    insertMarkup(catalogList, movies);
  } catch (error) {}
}

function getQuery() {
  const query = searchInput.value.trim();
  return query;
}

function onSubmit(e) {
  const searchInput = e.target.children[0];
  e.preventDefault();

  handleSearchedMovies(getQuery());

  searchInput.value = '';
  cancelBtn.classList.add('is-hidden');
}

function handleErrorMarkup(inputPlace, markup = '') {
  showError();

  inputPlace.innerHTML = markup;
}

function showError() {
  errorContainer.classList.remove('is-hidden');

  catalogList.innerHTML = '';

  pagination.classList.add('is-hidden');
}

function hideError() {
  errorContainer.classList.add('is-hidden');

  pagination.classList.remove('is-hidden');
}

function onInput(e) {
  const input = e.currentTarget;

  if (input.value !== '') return cancelBtn.classList.remove('is-hidden');
  cancelBtn.classList.add('is-hidden');
}

function onCancelBtn() {
  searchInput.value = '';

  cancelBtn.classList.add('is-hidden');
}
