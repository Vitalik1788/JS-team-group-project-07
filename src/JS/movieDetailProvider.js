import axios from 'axios';

export default class movieDetailProviver {
    constructor(apiKey){
        this.apiKey = apiKey
    }
    
    getMovieDetails(movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}`;
        return axios.get(url);
    }
}