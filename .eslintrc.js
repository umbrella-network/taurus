module.exports = {
  parser: "babel-eslint",
  env: {
    node: true,
    es2020: true,
    browser: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["eslint-plugin-prettier", "react-hooks"],
  rules: {
    strict: "error",
    curly: "error",
    "react/prop-types": [2, { ignore: ["children"] }],
    "linebreak-style": 0,
    "prettier/prettier": "error",
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "react/button-has-type": 0,
    "react/jsx-wrap-multilines": 0,
    "react/destructuring-assignment": 0,
    "no-use-before-define": 0,
    "class-methods-use-this": 0,
    "import/prefer-default-export": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-restricted-globals": "off",
    "react/display-name": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
