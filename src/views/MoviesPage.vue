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
  import { onMounted } from 'vue';
  import { useMediaStore } from '../stores/mediaStore';
  import FilterBar from '../components/common/FilterBar.vue';
  import MediaGrid from '../components/media/MediaGrid.vue';
  
  const moviesStore = useMediaStore();
  
  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
    // Na implementação real, você enviaria esses filtros para a API
    // Por enquanto, apenas recarregamos os filmes populares
    moviesStore.getPopularMovies();
  };
  
  const handlePageChange = (page) => {
    moviesStore.getPopularMovies(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  onMounted(() => {
    moviesStore.getPopularMovies();
  });
  </script>