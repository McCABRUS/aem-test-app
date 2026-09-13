module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^https://esm\\.sh/'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
  },
};
