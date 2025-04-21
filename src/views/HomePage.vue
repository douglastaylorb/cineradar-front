<template>
  <div class="container mx-auto px-4 py-6 md:py-8">
    <!-- Seção de Filmes Populares -->
    <section class="mb-8 md:mb-12">
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <h2 class="text-white text-xl md:text-2xl font-bold">Filmes Populares</h2>
        <router-link to="/movies" class="text-orange-500 hover:text-orange-400 text-sm md:text-base">
          Ver Todos
        </router-link>
      </div>
      
      <div v-if="moviesStore.movies.loading" class="flex justify-center py-8 md:py-12">
        <div class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      
      <div v-else>
        <!-- Versão mobile: scrollável horizontalmente -->
        <div class="flex md:hidden overflow-x-auto pb-4 space-x-4 snap-x scrollbar-hide">
          <div 
            v-for="movie in moviesStore.movies.results.slice(0, 10)"
            :key="`movie-${movie.id}`"
            class="flex-shrink-0 w-72 snap-start"
          >
            <media-card
              :id="movie.id"
              :title="movie.title"
              :overview="movie.overview"
              :poster-path="movie.poster_path"
              :release-date="movie.release_date"
              :vote-average="movie.vote_average"
              type="movie"
              class="h-full"
            />
          </div>
        </div>
        
        <!-- Versão desktop: grid -->
        <div class="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <media-card
            v-for="movie in moviesStore.movies.results.slice(0, 5)"
            :key="`movie-desktop-${movie.id}`"
            :id="movie.id"
            :title="movie.title"
            :overview="movie.overview"
            :poster-path="movie.poster_path"
            :release-date="movie.release_date"
            :vote-average="movie.vote_average"
            type="movie"
          />
        </div>
      </div>
    </section>
    
    <!-- Seção de Séries Populares -->
    <section class="mb-8 md:mb-12">
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <h2 class="text-white text-xl md:text-2xl font-bold">Séries Populares</h2>
        <router-link to="/tv" class="text-orange-500 hover:text-orange-400 text-sm md:text-base">
          Ver Todos
        </router-link>
      </div>
      
      <div v-if="moviesStore.tvShows.loading" class="flex justify-center py-8 md:py-12">
        <div class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      
      <div v-else>
        <!-- Versão mobile: scrollável horizontalmente -->
        <div class="flex md:hidden overflow-x-auto pb-4 space-x-4 snap-x scrollbar-hide">
          <div 
            v-for="show in moviesStore.tvShows.results.slice(0, 10)"
            :key="`tv-${show.id}`"
            class="flex-shrink-0 w-70 snap-start"
          >
            <media-card
              :id="show.id"
              :title="show.name"
              :overview="show.overview"
              :poster-path="show.poster_path"
              :release-date="show.first_air_date"
              :vote-average="show.vote_average"
              type="tv"
              class="h-full"
            />
          </div>
        </div>
        
        <!-- Versão desktop: grid -->
        <div class="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <media-card
            v-for="show in moviesStore.tvShows.results.slice(0, 5)"
            :key="`tv-desktop-${show.id}`"
            :id="show.id"
            :title="show.name"
            :overview="show.overview"
            :poster-path="show.poster_path"
            :release-date="show.first_air_date"
            :vote-average="show.vote_average"
            type="tv"
          />
        </div>
      </div>
    </section>

    <!-- Seção de Filmes por Tendência -->
    <section class="mb-8 md:mb-12">
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <h2 class="text-white text-xl md:text-2xl font-bold">Filmes por Tendência</h2>
        <router-link to="/movies" class="text-orange-500 hover:text-orange-400 text-sm md:text-base">
          Ver Todos
        </router-link>
      </div>
      
      <div v-if="moviesStore.trendingMovies.loading" class="flex justify-center py-8 md:py-12">
        <div class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      
      <div v-else>
        <!-- Versão mobile: scrollável horizontalmente -->
        <div class="flex md:hidden overflow-x-auto pb-4 space-x-4 snap-x scrollbar-hide">
          <div 
            v-for="movie in moviesStore.trendingMovies.results.slice(0, 10)"
            :key="`trending-movie-${movie.id}`"
            class="flex-shrink-0 w-70 snap-start"
          >
            <media-card
              :id="movie.id"
              :title="movie.title"
              :overview="movie.overview"
              :poster-path="movie.poster_path"
              :release-date="movie.release_date"
              :vote-average="movie.vote_average"
              type="movie"
              class="h-full"
            />
          </div>
        </div>
        
        <!-- Versão desktop: grid -->
        <div class="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <media-card
            v-for="movie in moviesStore.trendingMovies.results.slice(0, 5)"
            :key="`trending-movie-desktop-${movie.id}`"
            :id="movie.id"
            :title="movie.title"
            :overview="movie.overview"
            :poster-path="movie.poster_path"
            :release-date="movie.release_date"
            :vote-average="movie.vote_average"
            type="movie"
          />
        </div>
      </div>
    </section>
    
    <!-- Seção de Séries por Tendência -->
    <section class="mb-8 md:mb-12">
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <h2 class="text-white text-xl md:text-2xl font-bold">Séries Por Tendência</h2>
        <router-link to="/tv" class="text-orange-500 hover:text-orange-400 text-sm md:text-base">
          Ver Todos
        </router-link>
      </div>
      
      <div v-if="moviesStore.trendingTV.loading" class="flex justify-center py-8 md:py-12">
        <div class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      
      <div v-else>
        <!-- Versão mobile: scrollável horizontalmente -->
        <div class="flex md:hidden overflow-x-auto pb-4 space-x-4 snap-x scrollbar-hide">
          <div 
            v-for="show in moviesStore.trendingTV.results.slice(0, 10)"
            :key="`trending-tv-${show.id}`"
            class="flex-shrink-0 w-70 snap-start"
          >
            <media-card
              :id="show.id"
              :title="show.name"
              :overview="show.overview"
              :poster-path="show.poster_path"
              :release-date="show.first_air_date"
              :vote-average="show.vote_average"
              type="tv"
              class="h-full"
            />
          </div>
        </div>
        
        <!-- Versão desktop: grid -->
        <div class="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <media-card
            v-for="show in moviesStore.trendingTV.results.slice(0, 5)"
            :key="`trending-tv-desktop-${show.id}`"
            :id="show.id"
            :title="show.name"
            :overview="show.overview"
            :poster-path="show.poster_path"
            :release-date="show.first_air_date"
            :vote-average="show.vote_average"
            type="tv"
          />
        </div>
      </div>
    </section>

    <!-- Seção de Filmes por Avaliação -->
    <section class="mb-8 md:mb-12">
      <div class="flex justify-between items-center mb-4 md:mb-6">
        <h2 class="text-white text-xl md:text-2xl font-bold">Filmes por Avaliação</h2>
        <router-link to="/movies" class="text-orange-500 hover:text-orange-400 text-sm md:text-base">
          Ver Todos
        </router-link>
      </div>
      
      <div v-if="moviesStore.ratedMovies.loading" class="flex justify-center py-8 md:py-12">
        <div class="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      
      <div v-else>
        <!-- Versão mobile: scrollável horizontalmente -->
        <div class="flex md:hidden overflow-x-auto pb-4 space-x-4 snap-x scrollbar-hide">
          <div 
            v-for="movie in moviesStore.ratedMovies.results.slice(0, 10)"
            :key="`rated-movie-${movie.id}`"
            class="flex-shrink-0 w-70 snap-start"
          >
            <media-card
              :id="movie.id"
              :title="movie.title"
              :overview="movie.overview"
              :poster-path="movie.poster_path"
              :release-date="movie.release_date"
              :vote-average="movie.vote_average"
              type="movie"
              class="h-full"
            />
          </div>
        </div>
        
        <!-- Versão desktop: grid -->
        <div class="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <media-card
            v-for="movie in moviesStore.ratedMovies.results.slice(0, 5)"
            :key="`rated-movie-desktop-${movie.id}`"
            :id="movie.id"
            :title="movie.title"
            :overview="movie.overview"
            :poster-path="movie.poster_path"
            :release-date="movie.release_date"
            :vote-average="movie.vote_average"
            type="movie"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMediaStore } from '../stores/mediaStore';
import MediaCard from '../components/media/MediaCard.vue';

const moviesStore = useMediaStore();

onMounted(async () => {
  await Promise.all([
    moviesStore.getPopularMovies(),
    moviesStore.getRatingMovies(),
    moviesStore.getTrendingMovies(),
    moviesStore.getPopularTV(),
    moviesStore.getTrendingTV(),
  ]);
});
</script>

<style>
.scrollbar-hide {
  -ms-overflow-style: none;  
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.snap-x {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.snap-start {
  scroll-snap-align: start;
}
</style>