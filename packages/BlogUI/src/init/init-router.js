import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '../router/router';

export const initRouter = () => {
  // Create the router instance
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  return { plugin: router };
};
