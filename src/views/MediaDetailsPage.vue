<template>
    <div v-if="mediaStore.currentMedia.loading" class="container mx-auto px-4 py-16 flex justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
    </div>
    
    <div v-else-if="mediaStore.currentMedia.error" class="container mx-auto px-4 py-16">
      <div class="bg-red-900 bg-opacity-20 border border-red-800 text-red-100 px-4 py-3 rounded mb-6">
        <p>{{ mediaStore.currentMedia.error }}</p>
      </div>
      <button @click="goBack" class="bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md">
        Voltar
      </button>
    </div>
    
    <div v-else-if="media" class="min-h-screen">
      <!-- Hero Section com backdrop -->
      <div class="relative">
        <!-- Backdrop Image -->
        <div class="w-full h-[50vh] md:h-[70vh] relative">
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10"></div>
          <div 
            v-if="media.backdrop_path" 
            class="absolute inset-0 bg-cover bg-center"
            :style="`background-image: url(https://image.tmdb.org/t/p/original${media.backdrop_path})`"
          ></div>
          <div v-else class="absolute inset-0 bg-neutral-800"></div>
        </div>
        
        <!-- Content overlay -->
        <div class="container mx-auto px-4 absolute bottom-0 left-0 right-0 z-20 pb-8">
          <div class="flex flex-col md:flex-row items-start md:items-end gap-6">
            <!-- Poster -->
            <div class="w-40 md:w-64 flex-shrink-0 -mb-16 md:mb-0 rounded-lg overflow-hidden shadow-2xl">
              <img 
                v-if="media.poster_path" 
                :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`" 
                :alt="mediaTitle"
                class="w-full h-auto"
              />
              <div v-else class="w-full h-full aspect-[2/3] bg-neutral-700 flex items-center justify-center">
                <span class="text-gray-400">Não disponível</span>
              </div>
            </div>
            
            <!-- Title and basic info -->
            <div class="flex-grow">
              <div class="flex items-center gap-3 flex-wrap">
                <h1 class="text-white text-3xl md:text-4xl font-bold">{{ mediaTitle }}</h1>
                <span class="bg-orange-500 text-white px-2 py-1 rounded-md text-sm">
                  {{ media.vote_average.toFixed(1) }}
                </span>
              </div>
              
              <div class="mt-2 text-gray-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>{{ releaseYear }}</span>
                <span v-if="runtime">{{ runtime }}</span>
                <div class="flex flex-wrap gap-2 mt-1 md:mt-0">
                  <span 
                    v-for="genre in media.genres" 
                    :key="genre.id"
                    class="bg-neutral-700 px-2 py-1 rounded-md text-xs"
                  >
                    {{ genre.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="container mx-auto px-4 pt-20 md:pt-12 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Left Column: Overview and Cast -->
          <div class="md:col-span-2">
            <!-- Overview -->
            <section class="mb-12">
              <h2 class="text-white text-2xl font-bold mb-4">Sinopse</h2>
              <p class="text-gray-300">{{ media.overview || 'Nenhuma sinopse disponível.' }}</p>
            </section>
            
            <!-- Cast -->
            <section v-if="cast && cast.length > 0" class="mb-12">
              <h2 class="text-white text-2xl font-bold mb-4">Elenco Principal</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div 
                  v-for="person in cast.slice(0, 8)" 
                  :key="person.id"
                  class="bg-neutral-800 rounded-lg overflow-hidden"
                >
                  <div class="aspect-[2/3] relative">
                    <img 
                      v-if="person.profile_path" 
                      :src="`https://image.tmdb.org/t/p/w185${person.profile_path}`" 
                      :alt="person.name"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="w-full h-full bg-neutral-700 flex items-center justify-center">
                      <span class="text-gray-400 text-xs">Não disponível</span>
                    </div>
                  </div>
                  <div class="p-3">
                    <h3 class="text-white font-medium text-sm">{{ person.name }}</h3>
                    <p class="text-gray-400 text-xs mt-1">{{ person.character }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          <!-- Right Column: Details and Similar -->
          <div>
            <!-- Details -->
            <section class="mb-8 bg-neutral-800 rounded-lg p-6">
              <h2 class="text-white text-xl font-bold mb-4">Detalhes</h2>
              <div class="space-y-4">
                <div v-if="type === 'movie'">
                  <h3 class="text-gray-400 text-sm">Data de Lançamento</h3>
                  <p class="text-white">{{ formatDate(media.release_date) }}</p>
                </div>
                <div v-else>
                  <h3 class="text-gray-400 text-sm">Primeira Exibição</h3>
                  <p class="text-white">{{ formatDate(media.first_air_date) }}</p>
                </div>
                
                <div v-if="type === 'tv' && media.number_of_seasons">
                  <h3 class="text-gray-400 text-sm">Temporadas</h3>
                  <p class="text-white">{{ media.number_of_seasons }}</p>
                </div>
                
                <div v-if="type === 'tv' && media.number_of_episodes">
                  <h3 class="text-gray-400 text-sm">Episódios</h3>
                  <p class="text-white">{{ media.number_of_episodes }}</p>
                </div>
                
                <div>
                  <h3 class="text-gray-400 text-sm">Status</h3>
                  <p class="text-white">{{ media.status }}</p>
                </div>
                
                <div v-if="media.production_companies && media.production_companies.length">
                  <h3 class="text-gray-400 text-sm">Produtoras</h3>
                  <p class="text-white">
                    {{ media.production_companies.map(company => company.name).join(', ') }}
                  </p>
                </div>
                
                <div>
                  <h3 class="text-gray-400 text-sm">Avaliação</h3>
                  <div class="flex items-center mt-1">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-white ml-1">{{ media.vote_average.toFixed(1) }}</span>
                    </div>
                    <span class="text-gray-400 ml-2">({{ media.vote_count }} votos)</span>
                  </div>
                </div>
              </div>
            </section>
            
            <!-- Similar Content -->
            <section v-if="similarMedia && similarMedia.length > 0">
              <h2 class="text-white text-xl font-bold mb-4">Conteúdo Semelhante</h2>
              <div class="space-y-4">
                <div 
                  v-for="item in similarMedia.slice(0, 4)" 
                  :key="item.id"
                  class="bg-neutral-800 rounded-lg overflow-hidden flex"
                >
                  <div class="w-20 flex-shrink-0">
                    <img 
                      v-if="item.poster_path" 
                      :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`" 
                      :alt="type === 'movie' ? item.title : item.name"
                      class="w-full h-full object-cover"
                    />
                    <div v-else class="w-full h-full aspect-[2/3] bg-neutral-700 flex items-center justify-center">
                      <span class="text-gray-400 text-xs">Não disponível</span>
                    </div>
                  </div>
                  <div class="p-3 flex-grow">
                    <h3 class="text-white font-medium text-sm">
                      {{ type === 'movie' ? item.title : item.name }}
                    </h3>
                    <div class="flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-white text-xs ml-1">{{ item.vote_average.toFixed(1) }}</span>
                    </div>
                    <router-link 
                      :to="{ name: 'MediaDetails', params: { type, id: item.id } }"
                      class="text-orange-500 hover:text-orange-400 text-xs mt-2 inline-block"
                    >
                      Ver Detalhes
                    </router-link>
                  </div>
                </div>
              </div>
              
              <div class="mt-4">
                <router-link 
                  :to="{ name: type === 'movie' ? 'Movies' : 'TVShows' }"
                  class="text-orange-500 hover:text-orange-400 flex items-center"
                >
                  Ver mais {{ type === 'movie' ? 'filmes' : 'séries' }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useMediaStore } from '../stores/mediaStore';
  
  const route = useRoute();
  const router = useRouter();
  const mediaStore = useMediaStore();
  
  const type = computed(() => route.params.type);
  const id = computed(() => Number(route.params.id));
  
  const media = computed(() => mediaStore.currentMedia.details);
  const cast = computed(() => mediaStore.currentMedia.credits?.cast || []);
  const similarMedia = computed(() => mediaStore.currentMedia.similar || []);
  
  const mediaTitle = computed(() => {
    if (!media.value) return '';
    return type.value === 'movie' ? media.value.title : media.value.name;
  });
  
  const releaseYear = computed(() => {
    if (!media.value) return '';
    
    const dateStr = type.value === 'movie' 
      ? media.value.release_date 
      : media.value.first_air_date;
      
    if (!dateStr) return '';
    
    return new Date(dateStr).getFullYear();
  });
  
  const runtime = computed(() => {
    if (!media.value) return '';
    
    if (type.value === 'movie' && media.value.runtime) {
      const hours = Math.floor(media.value.runtime / 60);
      const minutes = media.value.runtime % 60;
      return `${hours}h ${minutes}m`;
    } else if (type.value === 'tv' && media.value.episode_run_time && media.value.episode_run_time.length) {
      return `${media.value.episode_run_time[0]}m por episódio`;
    }
    
    return '';
  });
  
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Desconhecido';
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Desconhecido';
    
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const goBack = () => {
    router.back();
  };
  
  const loadMediaDetails = async () => {
    if (type.value && id.value) {
      await mediaStore.getMediaDetails(type.value, id.value);
      
      // Scroll to top when loaded
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };
  
  onMounted(() => {
    loadMediaDetails();
  });
  
  // Recarregar detalhes quando a rota mudar (para navegação entre conteúdos similares)
  watch([type, id], () => {
    loadMediaDetails();
  });
  </script>