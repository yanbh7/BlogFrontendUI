import App from './app.vue';
import { createAppPlus } from './utils';
import './init';

const app = createAppPlus(App);

app.mount('#app');
