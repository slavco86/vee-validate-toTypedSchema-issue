import PageOne from '@/pages/PageOne.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PageTwo from '@/pages/PageTwo.vue';

const routes = [
  { path: '/', component: PageOne },
  { path: '/two', component: PageTwo }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
