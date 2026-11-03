import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const typescriptFiles = ['**/*.{ts,tsx,mts,cts}'];

const forFiles = (configs, files) => configs.map((config) => ({ ...config, files }));

export default [
  {
    ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**'],
  },
  eslint.configs.recommended,
  ...forFiles(tseslint.configs.recommended, typescriptFiles),
  ...forFiles(tseslint.configs.recommendedTypeChecked, typescriptFiles),
  {
    languageOptions: {
      globals: {
        ...globals.es2022,
      },
    },
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'max-len': [
        'error',
        {
          code: 140,
          comments: 140,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreRegExpLiterals: true,
        },
      ],
    },
  },
  {
    files: typescriptFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },
];
