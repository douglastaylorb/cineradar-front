<template>
  <div class="min-h-screen bg-neutral-900 text-white">
    <navbar />
    <main>
      <router-view />
    </main>
    <footer class="bg-neutral-800 py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-400">
        <p>© {{ new Date().getFullYear() }} CineRadar. Desenvolvido por Douglas Taylor.</p>
        <p class="mt-2 text-sm">Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue';
</script>