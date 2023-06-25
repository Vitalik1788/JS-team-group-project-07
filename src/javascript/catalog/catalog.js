import { refs } from './refs';
import { getCatalogMovies } from './api_service';
import { errorMarkup } from './create-error-markup';
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
  handleCatalogSection();
});

searchForm.addEventListener('submit', onSubmit);
cancelBtn.addEventListener('click', clearInputValue);
searchInput.addEventListener('input', () => {
  getQuery;
  onInput;
});

async function handleCatalogSection(query) {
  try {
    if (query === '') return updateErrorMarkup(errorMarkup());

    const catalogMovies = await getCatalogMovies(query, 1);
    createPagination(query, catalogMovies);
    const movies = await createMovieCard(catalogMovies);
    updateCatalogMarkup(movies);

    if (query && !errorContainer.classList.contains('is-hidden'))
      return toggleErrorContainer();
  } catch (error) {
    console.error('error:', error);
  }
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

  handleCatalogSection(getQuery());
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
