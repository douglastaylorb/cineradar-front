<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-white text-3xl font-bold mb-6">TV Shows</h1>
      
      <filter-bar 
        type="tv" 
        @filter-change="handleFilterChange"
      />
      
      <media-grid
        :items="moviesStore.tvShows.results"
        :loading="moviesStore.tvShows.loading"
        :error="moviesStore.tvShows.error"
        :current-page="moviesStore.tvShows.page"
        :total-pages="moviesStore.tvShows.totalPages"
        type="tv"
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
    // Por enquanto, apenas recarregamos as séries populares
    moviesStore.getPopularTV();
  };
  
  const handlePageChange = (page) => {
    moviesStore.getPopularTV(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  onMounted(() => {
    moviesStore.getPopularTV();
  });
  </script>