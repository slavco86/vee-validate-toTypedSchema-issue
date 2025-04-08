import { createRouter, createWebHistory } from 'vue-router'
import PageOne from "@/views/PageOne.vue";
import PageTwo from "@/views/PageTwo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: PageOne },
    { path: '/two', component: PageTwo }
  ],
})

export default router
