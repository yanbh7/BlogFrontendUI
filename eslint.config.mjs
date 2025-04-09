import pluginVue from 'eslint-plugin-vue';

export default [
  // add more generic rulesets here, such as:
  // js.configs.essential,
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      'vue/multi-word-component-names': 'off',
    },
    languageOptions: {
      sourceType: 'module',
    },
  },
];
