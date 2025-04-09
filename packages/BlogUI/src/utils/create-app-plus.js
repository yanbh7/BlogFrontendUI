import { createApp } from 'vue';
import { appInit } from '@blog/common';
import { initRouter } from '../init/init-router';

export const createAppPlus = (component, options) => {
  const app = createApp(component, options);
  appInit(app, {
    plugins: [initRouter()],
    directives: [],
    mixins: [],
    initComponents: () => {},
  });
  return app;
};
