module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: "espree",
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: "module",
    requireConfigFile: false,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    quotes: ["error", "double", { avoidEscape: true }],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
