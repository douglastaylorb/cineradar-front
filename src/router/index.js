import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MoviesPage from '../views/MoviesPage.vue';
import TVShowsPage from '../views/TVShowsPage.vue';
import SearchPage from '../views/SearchPage.vue';
import MediaDetailsPage from '../views/MediaDetailsPage.vue';
// import NotFoundPage from '../views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesPage
  },
  {
    path: '/tv',
    name: 'TVShows',
    component: TVShowsPage
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/:type/:id',
    name: 'MediaDetails',
    component: MediaDetailsPage,
    props: true,
  }
  //   {
  //     path: '/:pathMatch(.*)*',
  //     name: 'NotFound',
  //     component: NotFoundPage
  //   }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;