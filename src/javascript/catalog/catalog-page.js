// Імпорти
import { refs } from './refs';
// import ApiService from './api_service';
import { getCatalogMovies } from './api_service';
import { createErrorMarkup } from './create-error-markup';
import { createMovieCard } from './create-movie-card';

// Змінні
// const apiService = new ApiService();

// const wrapper = document.querySelector('.pagination-wrapper');

window.addEventListener('DOMContentLoaded', () => {
  // renderWeeklyTrends(apiService.page);
  getCatalogMovies();
});

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

// Функції

async function renderWeeklyTrends(page) {
  try {
    const response = await apiService.getMovies(page);

    handleMoviesData(response);
  } catch (error) {
    handleError;
  }
}

function handleMoviesData(data) {
  totalPages = data.total_pages;
  if (totalPages > 30) totalPages = 30;

  createMovieCard(data);
  updateNextButtonState(data.total_pages);
  createPaginationButtons(totalPages, currentPage);
}

function handleError(error) {
  clearCatalogList();

  createErrorMarkup();
  console.error('An error occurred:', error);
}

function getInputValue(e) {
  e.preventDefault();

  const query = refs.searchInput.value.trim();

  if (query === '') return handleEmptyQuery();
  getCatalogMovies(query);
}

function handleEmptyQuery() {
  clearCatalogList();

  toggleErrorContainer();
  refs.paginationContainer.classList.add('is-hidden');
  createErrorMarkup();
}

async function searchMovies() {
  try {
    const data = await apiService.getMovies();
    if (data.total_results === 0) return handleEmptyQuery();

    totalPages = data.total_pages;

    if (totalPages > 30) totalPages = 30;

    refs.paginationContainer.classList.remove('is-hidden');

    apiService.total = data.total_results;
    createMovieCard(data);
    currentPage = data.page;
    createPaginationButtons(totalPages, currentPage);

    refs.searchInput.value = '';
    toggleCancelButton();
  } catch (error) {
    handleError(error);
  }
}

function onInput(e) {
  if (e.currentTarget.value.trim()) return toggleCancelButton();

  toggleCancelButton();
}

function clearInputValue() {
  toggleCancelButton();
  refs.searchInput.value = '';
}

function toggleErrorContainer() {
  refs.errorContainer.classList.toggle('is-hidden');
}

function toggleCancelButton() {
  refs.cancelBtn.classList.toggle('is-hidden');
}

function hidePagination() {
  refs.paginationContainer.classList.remove('is-hidden');
}

function clearCatalogList() {
  refs.catalogList.innerHTML = '';
}

// Пагінація

function createPaginationButtons(totalPages, page) {
  let liTag = '';
  let afterPage = page + 1;
  let beforePage = page - 1;
  let active = '';

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
  }
}

function onNextPage() {
  if (currentPage < totalPages) {
    currentPage += 1;
    apiService.incrementPage();
    renderWeeklyTrends(currentPage);
  }
}

function onPrevPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    apiService.decrementPage();
    renderWeeklyTrends(currentPage);
  }
}
