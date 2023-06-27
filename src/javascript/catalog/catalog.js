import { refs } from './refs';
import { getTrendyFilms, getSearchedMovies } from '../api-service/api-service';
import { createErrorMarkup } from './create-error-markup';
import { createPagination } from './pagination';
import {
  createMarkup,
  insertMarkup,
} from '../weekly-trends/weekly-trends-markup';

// Рефи

const {
  searchForm,
  searchInput,
  catalogList,
  errorContainer,
  cancelBtn,
  pagination,
} = refs;

// Слухачі

window.addEventListener('DOMContentLoaded', () => {
  handleCatalogTrends();
});

searchForm.addEventListener('submit', onSubmit);

searchInput.addEventListener('input', onInput);

cancelBtn.addEventListener('click', onCancelBtn);

// Запит на сервер: Тренди тижня => Пошук

async function handleCatalogTrends() {
  try {
    const catalogMovies = await getTrendyFilms();
    createPagination('', catalogMovies);

    const movies = createMarkup(catalogMovies.results);

    insertMarkup(catalogList, movies);
  } catch (error) {
    console.error(error);
  }
}

async function handleSearchedMovies(query) {
  try {
    if (query === '')
      return handleErrorMarkup(errorContainer, createErrorMarkup());

    const searchedMovies = await getSearchedMovies(query);

    // console.log(searchedMovies.total_pages );

    createPagination(query, searchedMovies);

    if (searchedMovies.results.length === 0)
      return handleErrorMarkup(errorContainer, createErrorMarkup());

    hideError();

    const movies = createMarkup(searchedMovies.results);

    insertMarkup(catalogList, movies);
  } catch (error) {
    console.log(error);
  }
}

// =========== Допоміжні функії =========== //

// Обробка сабміту форми, отримання query

function onSubmit(e) {
  const searchFormInput = e.target.children[0];
  e.preventDefault();

  handleSearchedMovies(getQuery());

  searchFormInput.value = '';
  cancelBtn.classList.add('is-hidden');
}

function getQuery() {
  const query = searchInput.value.trim();
  return query;
}

// Обробка помилки: Відмалювання, приховання та показ

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

// Cancel Button

function onInput(e) {
  const input = e.currentTarget;

  if (input.value !== '') return cancelBtn.classList.remove('is-hidden');
  cancelBtn.classList.add('is-hidden');
}

function onCancelBtn() {
  searchInput.value = '';

  cancelBtn.classList.add('is-hidden');
}
