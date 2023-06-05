import { refs } from './catalog/components/refs';
import ApiService from './catalog/components/api_service';
import { createMovieCard } from './catalog/components/create-movie-card';

const apiService = new ApiService();
let currentPage = 1;

refs.searchForm.addEventListener('submit', getInputValue);
refs.cancelBtn.addEventListener('click', clearInputValue);

refs.nextPageBtn.addEventListener('click', onNextPage);
refs.prevPageBtn.addEventListener('click', onPrevPage);

renderWeeklyTrends(currentPage);

function renderWeeklyTrends(page) {
  apiService.getMovies(page).then(data => {
    createMovieCard(data);
  });
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

function getInputValue(e) {
  e.preventDefault();

  apiService.query = refs.searchInput.value.trim();
  apiService.resetPage();
  apiService.resetTotal();

  apiService.getMovies().then(data => {
    if (apiService.query === '') {
      alert('error');
      refs.catalogList.innerHTML = '';
      return;
    }

    apiService.total = data.total_results;
    const markup = createMovieCard(data);

    refs.searchInput.value = '';
  });
}

function clearInputValue() {
  refs.searchInput.value = '';
}
