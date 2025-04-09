import './style.css';
import App from './App.vue';
import { createAppPlus } from './utils';

const app = createAppPlus(App);

app.mount('#app');
