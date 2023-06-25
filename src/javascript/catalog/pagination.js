import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getCatalogMovies } from './api_service';
import { createMovieCard } from './create-movie-card';
import { updateCatalogMarkup } from './catalog';

export async function createPagination(query, data) {
  const container = document.getElementById('pagination');
  const options = {
    totalItems: data.total_results,
    itemsPerPage: 20,
    visiblePages: 3,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const pagination = new Pagination(container, options);
  setPage(pagination, query);
}

export function setPage(paginate, query) {
  paginate.on('afterMove', async ({ page = 1 }) => {
    try {
      const catalogMovies = await getCatalogMovies(query, page);
      const movies = await createMovieCard(catalogMovies);
      updateCatalogMarkup(movies);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
}
