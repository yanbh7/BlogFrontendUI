import { $dialog as dialog } from '@blog/common';
import { createAppPlus } from './create-app-plus';

export const $dialog = (options = {}) => {
  dialog({
    createAppPlus,
    ...options,
  });
};
