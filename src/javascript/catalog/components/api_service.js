export default class ApiService {
  static BASE_URL = 'https://api.themoviedb.org/3';
  static API_KEY = '41b8f9437bf3f899281f8a3f9bdc0891';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalAmount = 0;
  }

  async getMovies() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ApiService.API_KEY}`,
      },
    };

    let url = '';
    if (this.searchQuery) {
      url = `${ApiService.BASE_URL}/search/movie?api_key=${ApiService.API_KEY}&query=${this.searchQuery}&include_adult=false&language=en-US&page=${this.page}`;
    } else {
      url = `${ApiService.BASE_URL}/trending/all/week?api_key=${ApiService.API_KEY}&language=en-US&page=${this.page}`;
    }

    try {
      const response = await fetch(url, options);
      const movies = await response.json();
      return movies;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get total() {
    return this.totalAmount;
  }

  set total(newTotal) {
    this.totalAmount = newTotal;
  }

  resetTotal() {
    this.totalAmount = 0;
  }
}
