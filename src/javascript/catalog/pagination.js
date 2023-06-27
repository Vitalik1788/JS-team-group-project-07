import { getTrendyFilms, getSearchedMovies } from '../api-service/api-service';
import {
  createMarkup,
  insertMarkup,
} from '../weekly-trends/weekly-trends-markup';
import { refs } from './refs';

const { catalogList } = refs;

export const options = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 3,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="pagination-button">{{page}}</a>',
    currentPage:
      '<strong class="pagination-button is-active">{{page}}</strong>',
    moveButton:
      '<a href="#" class="arrow-button tui-{{type}}" style="border:none">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}" style="border:none; pointer-events: none;">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-{{type}}-is-ellip" style="border:none; position: relative; bottom: 25%; padding: 6px;">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

export function setPage(paginate, query) {
  paginate.on('afterMove', async ({ page = 1 }) => {
    try {
      if (query === '') {
        const catalogMovies = await getTrendyFilms(page);
        const trendsMovies = createMarkup(catalogMovies.results);
        insertMarkup(catalogList, trendsMovies);
        return;
      }

      const catalogMovies = await getSearchedMovies(query, page);
      const searchedMovies = createMarkup(catalogMovies.results);
      insertMarkup(catalogList, searchedMovies);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
}
