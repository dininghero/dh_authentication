module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-console": "off",
    "no-underscore-dangle": ["error", { "allow": ["_crypto", "_salt"] }],
    "class-methods-use-this": ["error", { "exceptMethods": ["salt", "decryption", "base64toBase64Url"] }],
  },
};
