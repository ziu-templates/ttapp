// http://eslint.org/docs/user-guide/configuring
const globalVariable = require('./etc').globalVariable;
function getGlobalVar(globals = []) {
  return globals.reduce((total, currentValue) => {
    total[currentValue] = false;
    return total;
  }, {});
}


module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    es6: true,
  },
  extends: '{{ lintConfig }}',
  globals: getGlobalVar(globalVariable),
  // add your custom rules here
  rules: {
    // not require constant expressions in conditions
    'no-constant-condition': 0,
    // not require === and !===
    'eqeqeq': 0,
    // allow multiline strings
    'no-multi-str': 0,
    // enforce 4 space indent
    'indent': ["error", 2],
    // undef
    'no-undef': 2,
    // allow variable decalared separately in functions
    'one-var': 0,
    // allow either backticks, double or single quotes
    'quotes': 0,
    // enforce no sapce before function parent
    'space-before-function-paren': ['error', 'never'],
    // not require camlecase
    'camelcase': 0,
    // not require newline at the end of files
    'eol-last': 0,
    // disallow semi in line end
    'semi': ["error", "always"],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // no-close in production
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
