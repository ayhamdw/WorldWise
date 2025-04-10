import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Helper function to convert all error rules to warnings
const convertErrorsToWarnings = (rulesObject) => {
  const modifiedRules = {};
  for (const [key, value] of Object.entries(rulesObject)) {
    if (Array.isArray(value) && value[0] === "error") {
      modifiedRules[key] = ["warn", ...value.slice(1)];
    } else if (value === "error") {
      modifiedRules[key] = "warn";
    } else {
      modifiedRules[key] = value;
    }
  }
  return modifiedRules;
};

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...convertErrorsToWarnings(js.configs.recommended.rules),
      ...convertErrorsToWarnings(reactHooks.configs.recommended.rules),
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
