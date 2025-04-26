<template>
  <nav class="bg-neutral-800 border-b border-neutral-600 py-4">
    <div class="container mx-auto px-4">
      <!-- Desktop Layout -->
      <div class="hidden md:flex justify-between items-center">
        <router-link to="/" class="text-white text-2xl font-bold flex">
          <img src="/logo.webp" alt="Logo" class="h-8 mr-2 inline-block" />
          CineRadar
        </router-link>
        
        <div class="flex items-center space-x-6">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="text-gray-300 hover:text-orange-500 transition-colors"
          >
            {{ item.name }}
          </router-link>
        </div>
        
        <div class="relative">
          <input 
            v-model="searchQuery"
            @keyup.enter="search"
            type="text" 
            placeholder="Busque por filmes ou séries..." 
            class="bg-neutral-600 text-white px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button 
            @click="search"
            class="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Layout -->
      <div class="flex md:hidden justify-between items-center">
        <router-link to="/" class="text-white text-xl font-bold">
          <img src="/logo.webp" alt="Logo" class="h-12 mr-2 inline-block" />
        </router-link>
        
        <div class="flex items-center space-x-3">
          <!-- Search Button -->
          <button 
            @click="toggleSearch"
            class="text-gray-300 hover:text-orange-500 p-2"
            aria-label="Buscar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <!-- Menu Button -->
          <button 
            @click="toggleMenu"
            class="text-gray-300 hover:text-orange-500 p-2"
            aria-label="Menu"
          >
            <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Search Bar (Expandable) -->
      <div v-if="searchOpen" class="mt-4 md:hidden">
        <div class="relative">
          <input 
            v-model="searchQuery"
            @keyup.enter="search"
            type="text" 
            placeholder="Busque por filmes ou séries..." 
            class="bg-neutral-600 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            ref="mobileSearchInput"
          />
          <button 
            @click="search"
            class="absolute right-3 top-2.5 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu (Expandable) -->
      <div 
        v-if="menuOpen" 
        class="md:hidden mt-4 bg-neutral-700 rounded-lg overflow-hidden"
      >
        <router-link 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="block px-4 py-3 text-gray-300 hover:bg-neutral-600 hover:text-orange-500 transition-colors"
          @click="menuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const menuOpen = ref(false);
const searchOpen = ref(false);
const mobileSearchInput = ref(null);

const navItems = [
  { name: 'Filmes', path: '/movies' },
  { name: 'Séries', path: '/tv' },
];

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({ 
      path: '/search',
      query: { q: searchQuery.value }
    });
    // Fechar o menu e a busca após pesquisar
    menuOpen.value = false;
    searchOpen.value = false;
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  // Fechar a busca se o menu for aberto
  if (menuOpen.value) {
    searchOpen.value = false;
  }
};

const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value;
  // Fechar o menu se a busca for aberta
  if (searchOpen.value) {
    menuOpen.value = false;
    // Focar no campo de busca após a renderização
    await nextTick();
    if (mobileSearchInput.value) {
      mobileSearchInput.value.focus();
    }
  }
};
</script>