<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-white text-3xl font-bold mb-2">Search Results</h1>
      <p v-if="searchQuery" class="text-gray-400 mb-6">
        Showing results for "{{ searchQuery }}"
      </p>
      
      <div class="mb-8">
        <div class="flex border-b border-neutral-600">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 font-medium transition-colors',
              activeTab === tab.id 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-400 hover:text-white'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
      
      <div v-if="activeTab === 'movies'">
        <media-grid
          :items="moviesStore.movies.results"
          :loading="moviesStore.movies.loading"
          :error="moviesStore.movies.error"
          :current-page="moviesStore.movies.page"
          :total-pages="moviesStore.movies.totalPages"
          type="movie"
          @page-change="handleMoviePageChange"
        />
      </div>
      
      <div v-else-if="activeTab === 'tv'">
        <media-grid
          :items="moviesStore.tvShows.results"
          :loading="moviesStore.tvShows.loading"
          :error="moviesStore.tvShows.error"
          :current-page="moviesStore.tvShows.page"
          :total-pages="moviesStore.tvShows.totalPages"
          type="tv"
          @page-change="handleTVPageChange"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMediaStore } from '../stores/mediaStore';
  import MediaGrid from '../components/media/MediaGrid.vue';
  
  const route = useRoute();
  const moviesStore = useMediaStore();
  
  const searchQuery = ref('');
  const activeTab = ref('movies');
  
  const tabs = [
    { id: 'movies', name: 'Filmes' },
    { id: 'tv', name: 'Séries' }
  ];
  
  const handleMoviePageChange = (page) => {
    moviesStore.searchMovies(searchQuery.value, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleTVPageChange = (page) => {
    moviesStore.searchTV(searchQuery.value, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const performSearch = () => {
    if (searchQuery.value) {
      moviesStore.searchMovies(searchQuery.value);
      moviesStore.searchTV(searchQuery.value);
    }
  };
  
  watch(() => route.query.q, (newQuery) => {
    if (newQuery) {
      searchQuery.value = newQuery;
      performSearch();
    }
  });
  
  onMounted(() => {
    if (route.query.q) {
      searchQuery.value = route.query.q;
      performSearch();
    }
  });
  </script>