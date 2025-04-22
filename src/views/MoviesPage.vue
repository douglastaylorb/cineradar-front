<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-white text-3xl font-bold mb-6">Movies</h1>
      
      <filter-bar 
        type="movie" 
        @filter-change="handleFilterChange"
      />
      
      <media-grid
        :items="moviesStore.movies.results"
        :loading="moviesStore.movies.loading"
        :error="moviesStore.movies.error"
        :current-page="moviesStore.movies.page"
        :total-pages="moviesStore.movies.totalPages"
        type="movie"
        @page-change="handlePageChange"
      />
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useMediaStore } from '../stores/mediaStore';
  import FilterBar from '../components/common/FilterBar.vue';
  import MediaGrid from '../components/media/MediaGrid.vue';
  
  const moviesStore = useMediaStore();
  const currentFilters = ref({
    sort: 'popularity.desc',
    genre: '',
    year: '',
    rating: ''
  });
  
  const handleFilterChange = (filters) => {
    currentFilters.value = filters;
    moviesStore.discoverMovies({
      with_genres: filters.genre,
      primary_release_year: filters.year,
      sort_by: filters.sort,
      vote_average_gte: filters.rating
    });
  };
  
  const handlePageChange = (page) => {
    moviesStore.discoverMovies({
      with_genres: currentFilters.value.genre,
      primary_release_year: currentFilters.value.year,
      sort_by: currentFilters.value.sort,
      vote_average_gte: currentFilters.value.rating
    }, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  onMounted(() => {
    moviesStore.discoverMovies({
      sort_by: currentFilters.value.sort
    });
  });
  </script>