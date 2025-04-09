/**
 *
 * @param { App } app
 * @param { Object } options
 * @returns App
 */

export const appInit = (app, options) => {
  const { plugins, initComponents, directives, mixins } = options;
  // Initialize plugins
  plugins?.forEach((plugin) => {
    app.use(plugin.plugin, plugin.options);
  });

  // Initialize directives
  directives?.forEach((directive) => {
    app.directive(directive.key, directive.definition);
  });

  // Initialize mixins
  mixins?.forEach((mixin) => {
    app.mixin(mixin);
  });

  // Initialize components
  initComponents?.();
};
