const IGNORE = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6
  },
  extends: ['airbnb'],
  plugins: ['react'],
  rules: {
    'arrow-parens': [ERROR, 'always'],
    'comma-dangle': [ERROR, 'never'],
    'default-case': IGNORE,
    'import/named': ERROR,
    'import/no-extraneous-dependencies': IGNORE,
    'import/prefer-default-export': IGNORE,
    'object-curly-spacing': [ERROR, 'always'],
    'no-param-reassign': IGNORE,
    'no-underscore-dangle': IGNORE,
    'no-unused-expressions': IGNORE,
    'no-unused-vars': ERROR,
    'react/jsx-no-bind': IGNORE,
    'react/no-deprecated': IGNORE,
    'react/no-is-mounted': ERROR,
    'react/jsx-curly-spacing': [ERROR, 'always'],
    'space-before-function-paren': IGNORE,
    'quotes': [ERROR, 'single']
  },
  globals: {
    CONFIG: true,
    NODE_ENV: true,
    IS_DEBUG: true,
    IS_BROWSER: true,
    IS_PRODUCTION: true,
    IS_DEVELOPMENT: true,
    IS_TEST: true,
    IS_BETA: true,
    PROJECT_ROOT: true,
    META: true,
    window: true
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: {
      globals: {
        describe: true,
        it: true
      }
    },
    jasmine: {
      globals: {
        describe: true,
        it: true
      }
    }
  }
};
