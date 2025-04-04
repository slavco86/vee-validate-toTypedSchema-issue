import './assets/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { createPinia } from 'pinia';
import { router } from '@/routes.js';

const pinia = createPinia();

const app = createApp(App);
app.use(PrimeVue, {
  inputVariant: 'filled',
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
});
app.use(pinia);
app.use(router);
app.mount('#app');
