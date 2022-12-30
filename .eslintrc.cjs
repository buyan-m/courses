/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
    ],
    plugins: ['import'],
    parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.app.json'],
    },
    settings: {
        'import/resolver': {
            'typescript': {
                'project': './tsconfig.app.json',
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': [".ts", ".vue"]
        },
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        // 'no-trailing-spaces': 'error',
        semi: ['error', 'never'],
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/comma-dangle': ['error', 'never'],
        'vue/html-indent': ['error', 4],
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0
    // quotes: ['error', 'single'],
    // 'coma-dangle': ['error', 'never'],
    // 'object-curly-newline': ['error', { 'multiline': true }],
    // 'object-property-newline': ['error', {}]
    },
}
