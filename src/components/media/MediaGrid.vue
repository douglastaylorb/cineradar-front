<template>
    <div>
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-900 bg-opacity-20 border border-red-800 text-red-100 px-4 py-3 rounded mb-6">
        <p>{{ error }}</p>
      </div>
      
      <div v-else-if="items.length === 0" class="text-center py-12">
        <p class="text-gray-400 text-lg">Nenhum resultado encontrado</p>
      </div>
      
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <media-card
          v-for="item in items"
          :key="`${type}-${item.id}`"
          :id="item.id"
          :title="type === 'movie' ? item.title : item.name"
          :overview="item.overview"
          :poster-path="item.poster_path"
          :release-date="formatDate(type === 'movie' ? item.release_date : item.first_air_date)"
          :vote-average="item.vote_average"
          :type="type"
        />
      </div>
      
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <div class="flex space-x-2">
          <button 
            v-for="pageNum in displayedPages" 
            :key="pageNum"
            @click="$emit('page-change', pageNum)"
            :class="[
              'px-4 py-2 rounded-md transition-colors',
              currentPage === pageNum 
                ? 'bg-orange-500 text-white' 
                : 'bg-neutral-600 text-gray-300 hover:bg-neutral-500'
            ]"
          >
            {{ pageNum }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import MediaCard from './MediaCard.vue';
  
  const props = defineProps({
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'movie',
      validator: (value) => ['movie', 'tv'].includes(value)
    }
  });

  defineEmits(['page-change']);

  const displayedPages = computed(() => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, props.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(props.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Unknown';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
</script>