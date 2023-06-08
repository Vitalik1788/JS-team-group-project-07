// Імпорти
import { refs } from './catalog/components/refs';
import ApiService from './catalog/components/api_service';
import { createErrorMarkup } from '../javascripts/create-error-markup';
import { createMovieCard } from '../javascripts/create-movie-card';

// Змінні
const apiService = new ApiService();

const wrapper = document.querySelector('.pagination-wrapper');

let currentPage = 1;
let totalPages = 0;

// Слухачі подій

refs.searchForm.addEventListener('submit', getInputValue);
refs.cancelBtn.addEventListener('click', clearInputValue);
refs.searchInput.addEventListener('input', onInput);
refs.nextPageBtn.addEventListener('click', onNextPage);
refs.prevPageBtn.addEventListener('click', onPrevPage);
refs.paginationContainer.addEventListener('click', onPageButtonClick);

// Приховання елементів

refs.errorContainer.classList.add('is-hidden');
refs.cancelBtn.classList.add('is-hidden');

// Запит трендів тижня

renderWeeklyTrends(currentPage);

// Функції

function renderWeeklyTrends(page) {
  apiService.getMovies(page).then(handleMoviesData).catch(handleError);
}

function handleMoviesData(data) {
  totalPages = data.total_pages;
  createMovieCard(data);
  updateNextButtonState(data.total_pages);
  createPaginationButtons(totalPages, currentPage);
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
      handleEmptyQuery();
    } else {
      wrapper.classList.remove('is-hidden');
      totalPages = data.total_pages;
      apiService.total = data.total_results;
      createMovieCard(data);
      currentPage = data.page;
      createPaginationButtons(totalPages, currentPage);
    }
    refs.searchInput.value = '';
  } catch (error) {
    handleError(error);
  }
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

// Пагінація

function createPaginationButtons(totalPages, page) {
  let liTag = '';
  let afterPage = page + 1;
  let beforePage = page - 1;

  if (totalPages > 5) {
    if (page > 2) {
      liTag += `<li class="pagination-item">
        <button type="button" class="pagination-button">1</button>
      </li>`;
      if (page > 3) {
        liTag += `<li class="pagination-item">
          <button type="button" class="pagination-dots">...</button>
        </li>`;
      }
    }
  }

  if (page == totalPages) {
    beforePage = beforePage - 1;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  if (page == 1) {
    afterPage = afterPage + 1;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages || plength < 1) {
      continue;
    }
    if (page == plength) {
      active = 'is-active';
    } else {
      active = '';
    }
    liTag += `<li class="pagination-item">
      <button type="button" class="pagination-button ${active}">${plength}</button>
    </li>`;
  }

  if (totalPages > 5) {
    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        liTag += `<li class="pagination-item">
        <button type="button" class="pagination-dots">...</button>
      </li>`;
      }
      liTag += `<li class="pagination-item">
      <button type="button" class="pagination-button">${totalPages}</button>
    </li>`;
    }
  }

  refs.paginationContainer.innerHTML = liTag;
  return liTag;
}

function onPageButtonClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const newPage = parseInt(event.target.textContent);
    if (!isNaN(newPage) && newPage !== currentPage) {
      currentPage = newPage;
      apiService.page = newPage;
      renderWeeklyTrends(currentPage);
    }
  }
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
