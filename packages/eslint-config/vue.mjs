import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

import baseConfig from './base.mjs';

const vueFiles = ['**/*.vue'];
const typedVueConfig = [...tseslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked].map((config) => ({
  ...config,
  files: vueFiles,
}));

export default [
  ...baseConfig,
  ...typedVueConfig,
  ...vue.configs['flat/recommended'],
  {
    files: vueFiles,
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-macros-order': 'error',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
];
