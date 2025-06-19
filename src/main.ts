import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { store, storeKey } from './store/store';

createApp(App).use(store, storeKey).mount('#app');
