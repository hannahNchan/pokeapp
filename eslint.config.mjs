import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: ["**/*.test.js"],
    rules: {
        semi: "error",
        "prefer-const": "error",
        "no-unused-vars": "warn",
        "no-console": [0],
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
