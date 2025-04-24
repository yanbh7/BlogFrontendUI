import { createApp } from 'vue';
import { appInit } from '@blog/common';
import { initRouter } from '../init/init-router';
import { initParticles } from '../init/init-paticles';

export const createAppPlus = (component, options) => {
  const app = createApp(component, options);
  appInit(app, {
    plugins: [initRouter(), initParticles()],
    directives: [],
    mixins: [],
    initComponents: () => {},
  });
  return app;
};
