import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylisticJs from '@stylistic/eslint-plugin-js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@stylistic/js': stylisticJs
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            '@stylistic/js/array-bracket-spacing': ['error', 'never'],
            '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/js/eol-last': 'error',
            '@stylistic/js/indent': ['error', 4, { SwitchCase: 1 }],
            '@stylistic/js/jsx-quotes': ['error', 'prefer-single'],
            '@stylistic/js/max-len': ['error', { 'code': 120 }],
            '@stylistic/js/no-extra-semi': 'error',
            '@stylistic/js/no-multi-spaces': 'error',
            '@stylistic/js/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
            '@stylistic/js/no-trailing-spaces': 'error',
            '@stylistic/js/object-curly-spacing': ['error', 'always'],
            '@stylistic/js/one-var-declaration-per-line': ['error', 'always'],
            '@stylistic/js/padded-blocks': ['error', 'never'],
            '@stylistic/js/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: ['export', 'return', 'function'] }
            ],
            '@stylistic/js/quotes': ['error', 'single'],
            '@stylistic/js/semi': 'error',
            '@stylistic/js/semi-spacing': 'error',
            '@stylistic/js/semi-style': ['error', 'last'],
            '@stylistic/js/space-before-blocks': 'error',
            '@stylistic/js/space-in-parens': 'error',
            'no-console': 'error',
        },
    }
);
