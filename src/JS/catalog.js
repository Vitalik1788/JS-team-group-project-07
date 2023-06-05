// Импорты
import { refs } from './catalog/components/refs';
import ApiService from './catalog/components/api_service';
import { createMovieCard } from './catalog/components/create-movie-card';
import { createErrorMarkup } from './catalog/components/create-error-markup';

// Змінні
const apiService = new ApiService();
let currentPage = 1;

// Слушатели событий

refs.searchForm.addEventListener('submit', getInputValue);
refs.cancelBtn.addEventListener('click', clearInputValue);
refs.searchInput.addEventListener('input', onInput);
refs.nextPageBtn.addEventListener('click', onNextPage);
refs.prevPageBtn.addEventListener('click', onPrevPage);

// Приховання елементів

refs.errorContainer.classList.add('is-hidden');
refs.cancelBtn.classList.add('is-hidden');

// Запит трендів тижня

renderWeeklyTrends(currentPage);

// Функции

function renderWeeklyTrends(page) {
  apiService.getMovies(page).then(handleMoviesData).catch(handleError);
}

function handleMoviesData(data) {
  createMovieCard(data);
  refs.paginationButton.textContent = currentPage;
  updateNextButtonState(data.total_pages);
}

function handleError(error) {
  refs.catalogList.innerHTML = '';
  createErrorMarkup();
  console.error('An error occurred:', error);
}

function getInputValue(e) {
  e.preventDefault();

  refs.paginationContainer.classList.remove('is-hidden');
  refs.errorContainer.classList.add('is-hidden');

  const query = refs.searchInput.value.trim();
  apiService.query = query;
  apiService.resetPage();
  apiService.resetTotal();

  if (query === '') {
    handleEmptyQuery();
  } else {
    searchMovies();
  }
}

function handleEmptyQuery() {
  refs.catalogList.innerHTML = '';
  createErrorMarkup();
}

async function searchMovies() {
  try {
    const data = await apiService.getMovies();
    if (data.total_results === 0) {
      handleEmptyResults();
    } else {
      apiService.total = data.total_results;
      createMovieCard(data);
      currentPage = data.page;
      refs.paginationButton.textContent = currentPage;
    }
    refs.searchInput.value = '';
  } catch (error) {
    handleError(error);
  }
}

function handleEmptyResults() {
  refs.catalogList.innerHTML = '';
  createErrorMarkup();
}

function onInput(e) {
  if (e.currentTarget.value.trim()) {
    refs.cancelBtn.classList.remove('is-hidden');
  } else {
    refs.cancelBtn.classList.add('is-hidden');
  }
}

function clearInputValue() {
  refs.cancelBtn.classList.add('is-hidden');
  refs.searchInput.value = '';
}

function updateNextButtonState(totalPages) {
  if (currentPage === totalPages) {
    refs.nextPageBtn.setAttribute('disabled', 'disabled');
  } else {
    refs.nextPageBtn.removeAttribute('disabled');
  }
}

function onNextPage() {
  currentPage += 1;
  apiService.incrementPage();
  renderWeeklyTrends(currentPage);
}

function onPrevPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    apiService.decrementPage();
    renderWeeklyTrends(currentPage);
  }
}
