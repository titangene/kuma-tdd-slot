import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import oxlint from 'eslint-plugin-oxlint';
import vitest from '@vitest/eslint-plugin';

export default defineConfig(
  globalIgnores(['**/dist/**', '**/coverage/**']),
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettier,
  {
    ...vitest.configs.recommended,
    // files: ['**/test/**'],
    rules: {
      'vitest/expect-expect': "off"
    }
  },
  ...oxlint.buildFromOxlintConfigFile('.oxlintrc.json')
);
