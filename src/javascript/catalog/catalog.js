import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import { refs } from './refs';
import { getTrendyFilms, getSearchedMovies } from '../api-service/api-service';
import { createErrorMarkup } from './create-error-markup';
import { setPage, options } from './pagination';
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
  paginationContainer,
} = refs;

const paginationInstance = new Pagination(paginationContainer, options);

// Слухачі

window.addEventListener('DOMContentLoaded', () => {
  handleCatalogTrends();
});

searchForm.addEventListener('submit', onSubmit);

searchInput.addEventListener('input', onInput);

cancelBtn.addEventListener('click', onCancelBtnClick);

// Запит на сервер: Тренди тижня => Пошук

async function handleCatalogTrends() {
  try {
    const catalogMovies = await getTrendyFilms();

    paginationInstance.reset(catalogMovies.total_results);
    setPage(paginationInstance, '');

    const movies = createMarkup(catalogMovies.results);

    insertMarkup(catalogList, movies);
  } catch (error) {
    console.error(error);
  }
}

async function handleSearchedMovies(query) {
  try {
    const searchedMovies = await getSearchedMovies(query);

    // if (searchedMovies.total_results <= 20) {
    //   paginationContainer.classList.add('is-hidden');
    //   console.log(paginationContainer.classList);
    // }

    paginationInstance.reset(searchedMovies.total_results);
    setPage(paginationInstance, query);

    if (searchedMovies.results.length === 0 || query === '') {
      const errorMarkup = createErrorMarkup();

      insertMarkup(errorContainer, errorMarkup);
      showErrorMarkup();
      return;
    }

    hideErrorMarkup();

    const movies = createMarkup(searchedMovies.results);

    insertMarkup(catalogList, movies);
  } catch (error) {
    console.log(error);
  }
}

// =========== Допоміжні функії =========== //

// Обробка сабміту форми, отримання query

function onSubmit(e) {
  e.preventDefault();
  const query = e.target.children.search.value.trim();

  handleSearchedMovies(query);

  clearSearchInput();
}

function clearSearchInput() {
  searchInput.value = '';
  cancelBtn.classList.add('is-hidden');
}

// Обробка помилки: приховання та показ

function showErrorMarkup() {
  errorContainer.classList.remove('is-hidden');

  catalogList.innerHTML = '';

  paginationContainer.classList.add('is-hidden');
}

function hideErrorMarkup() {
  errorContainer.classList.add('is-hidden');

  paginationContainer.classList.remove('is-hidden');
}

// Cancel Button

function onInput(e) {
  const input = e.currentTarget;

  if (input.value !== '') return cancelBtn.classList.remove('is-hidden');
  cancelBtn.classList.add('is-hidden');
}

function onCancelBtnClick() {
  searchInput.value = '';

  cancelBtn.classList.add('is-hidden');
}
