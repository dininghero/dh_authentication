module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
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
    "camelcase": "off",
    "no-underscore-dangle": ["error", { "allow": ["_salt"] }],
    "class-methods-use-this": ["error", { "exceptMethods":
    [
      "salt",
      "decryption",
      "base64toBase64Url",
      "addAccessScopes",
      "verifyExpiration",
      "convertBase64",
      "decodeBase64Url",
      "daysInMonth",
      "generateRandomInclusive",
      "writeToFile",
      "remove",
    ]
  }],
    "no-useless-escape": "off",
    "radix": "off",
    "object-shorthand": "off",
  },
};
