import { defineStore } from 'pinia';
import api from '../services/api';

export const useMediaStore = defineStore('media', {
  state: () => ({
    movies: {
      results: [],
      page: 1,
      totalPages: 0,
      loading: false,
      error: null,
    },
    tvShows: {
      results: [],
      page: 1,
      totalPages: 0,
      loading: false,
      error: null,
    },
    ratedMovies: {
      results: [],
      page: 1,
      totalPages: 0,
      loading: false,
      error: null,
    },
    trendingMovies: {
      results: [],
      page: 1,
      totalPages: 0,
      loading: false,
      error: null,
    },
    trendingTV: {
      results: [],
      page: 1,
      totalPages: 0,
      loading: false,
      error: null,
    },
    currentMedia: {
      details: null,
      credits: null,
      similar: [],
      loading: false,
      error: null
    },
    currentProviders: {
      loading: false,
      error: null,
      data: null,
    },
    searchQuery: '',
  }),

  actions: {
    async searchMovies(query, page = 1) {
      this.movies.loading = true;
      this.searchQuery = query;

      try {
        const response = await api.searchMovies(query, page);
        this.movies.results = response.data.results;
        this.movies.page = response.data.page;
        this.movies.totalPages = response.data.total_pages;
        this.movies.error = null;
      } catch (error) {
        this.movies.error = error.message || 'Failed to search movies';
        console.error('Error searching movies:', error);
      } finally {
        this.movies.loading = false;
      }
    },

    async getPopularMovies(page = 1) {
      this.movies.loading = true;

      try {
        const response = await api.getPopularMovies(page);
        this.movies.results = response.data.results;
        this.movies.page = response.data.page;
        this.movies.totalPages = response.data.total_pages;
        this.movies.error = null;
      } catch (error) {
        this.movies.error = error.message || 'Failed to get popular movies';
        console.error('Error getting popular movies:', error);
      } finally {
        this.movies.loading = false;
      }
    },

    async getRatingMovies(page = 1) {
      this.ratedMovies.loading = true;

      try {
        const response = await api.getRatingMovies(page);
        this.ratedMovies.results = response.data.results;
        this.ratedMovies.page = response.data.page;
        this.ratedMovies.totalPages = response.data.total_pages;
        this.ratedMovies.error = null;
      } catch (error) {
        this.ratedMovies.error = error.message || 'Failed to get rating movies';
        console.error('Error getting rating movies:', error);
      } finally {
        this.ratedMovies.loading = false;
      }
    },

    async getTrendingMovies(page = 1) {
      this.trendingMovies.loading = true;

      try {
        const response = await api.getTrendingMovies(page);
        this.trendingMovies.results = response.data.results;
        this.trendingMovies.page = response.data.page;
        this.trendingMovies.totalPages = response.data.total_pages;
        this.trendingMovies.error = null;
      } catch (error) {
        this.trendingMovies.error = error.message || 'Failed to get trending movies';
        console.error('Error getting trending movies:', error);
      } finally {
        this.trendingMovies.loading = false;
      }
    },

    async discoverMovies(filters = {}, page = 1) {
      this.movies.loading = true;
      try {
        const response = await api.getDiscoverMovies({ ...filters, page });
        this.movies.results = response.data.results;
        this.movies.page = response.data.page;
        this.movies.totalPages = response.data.total_pages;
        this.movies.error = null;
      } catch (error) {
        this.movies.error = error.message || 'Erro ao buscar filmes filtrados';
        console.error('Erro ao buscar filmes filtrados:', error);
      } finally {
        this.movies.loading = false;
      }
    },

    async searchTV(query, page = 1) {
      this.tvShows.loading = true;
      this.searchQuery = query;

      try {
        const response = await api.searchTV(query, page);
        this.tvShows.results = response.data.results;
        this.tvShows.page = response.data.page;
        this.tvShows.totalPages = response.data.total_pages;
        this.tvShows.error = null;
      } catch (error) {
        this.tvShows.error = error.message || 'Failed to search TV shows';
        console.error('Error searching TV shows:', error);
      } finally {
        this.tvShows.loading = false;
      }
    },

    async getPopularTV(page = 1) {
      this.tvShows.loading = true;

      try {
        const response = await api.getPopularTV(page);
        this.tvShows.results = response.data.results;
        this.tvShows.page = response.data.page;
        this.tvShows.totalPages = response.data.total_pages;
        this.tvShows.error = null;
      } catch (error) {
        this.tvShows.error = error.message || 'Failed to get popular TV shows';
        console.error('Error getting popular TV shows:', error);
      } finally {
        this.tvShows.loading = false;
      }
    },

    async getTrendingTV(page = 1) {
      this.trendingTV.loading = true;

      try {
        const response = await api.getTrendingTV(page);
        this.trendingTV.results = response.data.results;
        this.trendingTV.page = response.data.page;
        this.trendingTV.totalPages = response.data.total_pages;
        this.trendingTV.error = null;
      } catch (error) {
        this.trendingTV.error = error.message || 'Failed to get trending TV shows';
        console.error('Error getting trending TV shows:', error);
      } finally {
        this.trendingTV.loading = false;
      }
    },
    async getMediaDetails(type, id) {
      this.currentMedia.loading = true;
      this.currentMedia.error = null;
      
      try {
        let detailsPromise, creditsPromise, similarPromise;
        
        if (type === 'movie') {
          detailsPromise = api.getMovieDetails(id);
          creditsPromise = api.getMovieCredits(id);
          similarPromise = api.getSimilarMovies(id);
        } else {
          detailsPromise = api.getTVDetails(id);
          creditsPromise = api.getTVCredits(id);
          similarPromise = api.getSimilarTV(id);
        }
        
        const [detailsResponse, creditsResponse, similarResponse] = await Promise.all([
          detailsPromise,
          creditsPromise,
          similarPromise
        ]);
        
        this.currentMedia.details = detailsResponse.data;
        this.currentMedia.credits = creditsResponse.data;
        this.currentMedia.similar = similarResponse.data.results;
      } catch (error) {
        this.currentMedia.error = error.message || `Failed to get ${type} details`;
        console.error(`Error getting ${type} details:`, error);
      } finally {
        this.currentMedia.loading = false;
      }
    },
    async getTVProviders(id) {
      this.currentProviders.loading = true;
      this.currentProviders.error = null;
      this.currentProviders.data = null;
      try {
        const response = await api.getTVProviders(id);
        this.currentProviders.data = response.data;
      } catch (error) {
        this.currentProviders.error = error.message || 'Failed to get TV providers';
      } finally {
        this.currentProviders.loading = false;
      }
    },
    async getMovieProviders(id) {
      this.currentProviders.loading = true;
      this.currentProviders.error = null;
      this.currentProviders.data = null;
      try {
        const response = await api.getMovieProviders(id);
        this.currentProviders.data = response.data;
      } catch (error) {
        this.currentProviders.error = error.message || 'Failed to get movie providers';
      } finally {
        this.currentProviders.loading = false;
      }
    }
  },
});