import vueConfig from '@trade-note/eslint-config/vue';

const sourceFiles = ['src/**/*.{ts,vue}'];
const publicApiPattern = {
  regex: '^@/(pages|widgets|features|entities)/[^/]+/.+',
  message: 'Import a slice through its public index.ts API.',
};

const restrictImports = (files, forbiddenLayers) => ({
  files,
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          publicApiPattern,
          ...(forbiddenLayers.length > 0
            ? [
                {
                  group: forbiddenLayers.flatMap((layer) => [`@/${layer}`, `@/${layer}/**`]),
                  message: 'FSD modules may only import from lower layers. Keep same-layer composition in a higher layer.',
                },
              ]
            : []),
        ],
      },
    ],
  },
});

export default [
  ...vueConfig,
  restrictImports(sourceFiles, []),
  restrictImports(['src/pages/**/*.{ts,vue}'], ['app', 'pages']),
  restrictImports(['src/widgets/**/*.{ts,vue}'], ['app', 'pages', 'widgets']),
  restrictImports(['src/features/**/*.{ts,vue}'], ['app', 'pages', 'widgets', 'features']),
  restrictImports(['src/entities/**/*.{ts,vue}'], ['app', 'pages', 'widgets', 'features', 'entities']),
  restrictImports(['src/shared/**/*.{ts,vue}'], ['app', 'pages', 'widgets', 'features', 'entities']),
];
