<template>
  <div class="min-h-screen bg-neutral-900 text-white">
    <navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from './views/Footer.vue';
import Navbar from './components/layout/Navbar.vue';
</script>