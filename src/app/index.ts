import { createApp } from 'vue';
import './styles/index.css';
import App from './app.vue';
import router from '~/app/router/router.ts';

createApp(App)
  .use(router)
  .mount('#app');
