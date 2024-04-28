import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginSecurity from "eslint-plugin-security";
import jest from "eslint-plugin-jest";
import react from "eslint-plugin-react";
import globals from "globals"

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  pluginSecurity.configs.recommended,
  {
    plugins: {
      react
    },
    rules:{
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error"
    },
    languageOptions: {
      ecmaVersion: 2023,
      parserOptions:{
        ecmaFeatures: {
          jsx: true
        }
      },
      globals:{
        ...globals.browser
      }
    },
  },
  {
    settings:{
      jest:{
        version: "26.6.3"
      }
    },
    ...jest.configs["flat/recommended"]
  },
  {
  ignores: [
    "**/node_modules/",
    "**/coverage",
    "**/build/**/*",
    "**/*.md",
    "./eslint.config.js",
    "docker/",
  ],
  languageOptions: {
    ecmaVersion: 2023,
    globals:{
      ...globals.node,
    }
  },
  rules: {
    "no-console": "error",
    "func-names": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "jest/expect-expect": "off",
    "security/detect-object-injection": "off",
  }
}]
