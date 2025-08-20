//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  ...tanstackConfig,
  {
    ignores: ["eslint.config.js", "prettier.config.js"],
  },
  {
    rules: {
      "tanstack/pnpm-workspace": "off",
      "pnpm/yaml-no-unused-catalog-item": "off",
      "pnpm/yaml-no-duplicate-catalog-item": "off",
      "pnpm/json-prefer-workspace-settings": "off",
      "pnpm/json-valid-catalog": "off",
      "pnpm/json-enforce-catalog": "off",
    },
  },
  {
    rules: {
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"],
      "eol-last": ["error", "always"],
    },
  },

  // React Plugins
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      ...reactRefresh.configs.vite.rules,
    },
  },
];
