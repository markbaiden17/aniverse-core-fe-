/**
 * ESLint Configuration
 * Defines linting rules and environment settings for the project
 */

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignore build artifacts
  globalIgnores(['dist']),

  {
    // Target TypeScript and React files
    files: ['**/*.{ts,tsx}'],

    // Apply recommended configuration sets
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    // Environment and global variables
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])