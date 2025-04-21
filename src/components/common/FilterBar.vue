<template>
    <div class="bg-neutral-700 rounded-lg p-4 mb-6">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex-grow">
          <h3 class="text-white font-medium mb-2">Ordenar por</h3>
          <select 
            v-model="selectedSort"
            @change="emitFilters"
            class="bg-neutral-600 text-white px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="popularity.desc">Popularidade (Maior para o menor)</option>
            <option value="popularity.asc">Popularidade (Menor para o maior)</option>
            <option value="vote_average.desc">Avaliação (Maior para o menor)</option>
            <option value="vote_average.asc">Avaliação (Menor para o maior)</option>
            <option value="release_date.desc">Data de lançamento (Mais novo)</option>
            <option value="release_date.asc">Data de lançamento (Mais antigo)</option>
          </select>
        </div>
        
        <div class="flex-grow">
          <h3 class="text-white font-medium mb-2">Gênero</h3>
          <select 
            v-model="selectedGenre"
            @change="emitFilters"
            class="bg-neutral-600 text-white px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Todos os gêneros</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </option>
          </select>
        </div>
        
        <div class="flex-grow">
          <h3 class="text-white font-medium mb-2">Ano</h3>
          <select 
            v-model="selectedYear"
            @change="emitFilters"
            class="bg-neutral-600 text-white px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Todos</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        
        <div class="flex-grow">
          <h3 class="text-white font-medium mb-2">Avaliação</h3>
          <select 
            v-model="selectedRating"
            @change="emitFilters"
            class="bg-neutral-600 text-white px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Todos</option>
            <option value="7">7+ Estrelas</option>
            <option value="8">8+ Estrelas</option>
            <option value="9">9+ Estrelas</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'movie',
      validator: (value) => ['movie', 'tv'].includes(value)
    }
  });
  
  const emit = defineEmits(['filter-change']);
  
  const selectedSort = ref('popularity.desc');
  const selectedGenre = ref('');
  const selectedYear = ref('');
  const selectedRating = ref('');
  
  // Exemplo de gêneros (na implementação real, estes seriam buscados da API)
  const genres = [
    { id: 28, name: 'Ação' },
    { id: 12, name: 'Aventura' },
    { id: 16, name: 'Animação' },
    { id: 35, name: 'Comedia' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentario' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Familia' },
    { id: 14, name: 'Fantasia' },
    { id: 36, name: 'Historia' },
    { id: 27, name: 'Terror' },
    { id: 10402, name: 'Musical' },
    { id: 9648, name: 'Mistério' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Ficção' },
    { id: 10770, name: 'Programa de TV' },
    { id: 53, name: 'Suspense' },
    { id: 10752, name: 'Guerra' },
    { id: 37, name: 'Faroeste' }
  ];
  
  const years = computed(() => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= 1990; i--) {
      yearsList.push(i);
    }
    return yearsList;
  });
  
  const emitFilters = () => {
    emit('filter-change', {
      sort: selectedSort.value,
      genre: selectedGenre.value,
      year: selectedYear.value,
      rating: selectedRating.value
    });
  };
  
  onMounted(() => {
    emitFilters();
  });
  </script>