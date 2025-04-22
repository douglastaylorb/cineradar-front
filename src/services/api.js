import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
});

export default {
  // Filmes
  searchMovies(query, page = 1) {
    return api.get(`/movies/search?query=${query}&page=${page}`);
  },

  getPopularMovies(page = 1) {
    return api.get(`/movies/popular?page=${page}`);
  },

  getRatingMovies(page = 1) {
    return api.get(`/movies/rating?page=${page}`);
  },

  getTrendingMovies(page = 1) {
    return api.get(`/movies/trending?page=${page}`);
  },

  getMovieDetails(id) {
    return api.get(`/movies/${id}`);
  },

  getMovieCredits(id) {
    return api.get(`/movies/${id}/credits`);
  },

  getSimilarMovies(id) {
    return api.get(`/movies/${id}/similar`);
  },

  getDiscoverMovies(filters = {}) {
    return api.get('/movies/discover', { params: filters });
  },

  // Séries
  searchTV(query, page = 1) {
    return api.get(`/tv/search?query=${query}&page=${page}`);
  },

  getPopularTV(page = 1) {
    return api.get(`/tv/popular?page=${page}`);
  },

  getTrendingTV(page = 1) {
    return api.get(`/tv/trending?page=${page}`);
  },
  
  getTVDetails(id) {
    return api.get(`/tv/${id}`);
  },
  
  getTVCredits(id) {
    return api.get(`/tv/${id}/credits`);
  },
  
  getSimilarTV(id) {
    return api.get(`/tv/${id}/similar`);
  }
};