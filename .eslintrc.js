module.exports = {
  'env': {
    'browser': true,
  },
  'extends': [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
  },
};
