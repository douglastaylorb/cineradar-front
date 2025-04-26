<template>
  <div class="bg-neutral-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
    <div class="relative pb-[150%]">
      <img 
        v-if="posterPath" 
        :src="`https://image.tmdb.org/t/p/w500${posterPath}`" 
        :alt="title"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div v-else class="absolute inset-0 bg-neutral-600 flex items-center justify-center">
        <span class="text-gray-400">Não disponível</span>
      </div>
      
      <div class="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1.5">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-white text-xs ml-1">{{ voteAverage.toFixed(1) }}</span>
        </div>
      </div>
    </div>
    
    <div class="p-4 flex-grow flex flex-col">
      <h3 class="text-white font-bold text-lg mb-1 line-clamp-2">{{ title }}</h3>
      <p class="text-gray-400 text-sm mb-2">{{ releaseDate }}</p>
      <p class="text-gray-300 text-sm line-clamp-3 mb-4">{{ overview }}</p>
      
      <div class="mt-auto">
        <router-link 
          :to="{ name: 'MediaDetails', params: { type, id } }"
          class="bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md w-full transition-colors block text-center"
        >
          Ver Detalhes
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    default: 'Não disponível'
  },
  posterPath: {
    type: String,
    default: null
  },
  releaseDate: {
    type: String,
    default: 'Não disponível'
  },
  voteAverage: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'movie',
    validator: (value) => ['movie', 'tv'].includes(value)
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>