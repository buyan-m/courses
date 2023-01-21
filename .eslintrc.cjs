/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'airbnb-base',
    ],

    rules: {
        indent: ['error', 4],
        'max-len': ['error', 120],
        'linebreak-style': ['error', 'unix'],
        // 'no-trailing-spaces': 'error',
        semi: ['error', 'never'],
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'no-underscore-dangle': 0,
        'class-methods-use-this': 0,
        'import/prefer-default-export': 0,
    // quotes: ['error', 'single'],
    // 'coma-dangle': ['error', 'never'],
    // 'object-curly-newline': ['error', { 'multiline': true }],
    // 'object-property-newline': ['error', {}]
    },
    overrides: [{
        files: ['*.vue', '*.ts'],
        extends: [
            'airbnb-typescript/base',
            'plugin:vue/vue3-recommended',
            '@vue/eslint-config-typescript',
        ],
        rules: {
            '@typescript-eslint/semi': ['error', 'never'],
            '@typescript-eslint/indent': ['error', 4],
            '@typescript-eslint/comma-dangle': ['error', 'never'],
            'vue/html-indent': ['error', 4],
        },
        plugins: ['import'],
        parserOptions: {
            ecmaVersion: 'latest',
            project: ['./tsconfig.json'],
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                },
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.vue'],
            },
        },
    }, {
        files: ['e2e/**/*.ts', 'e2e/*.ts'],
        parserOptions: {
            project: ['./e2e/tsconfig.e2e.json'],
            settings: {
                'import/resolver': {
                    typescript: {
                        project: './e2e/tsconfig.e2e.json',
                    },
                },
            },
        },
        rules: {
            'import/no-extraneous-dependencies': ['error', {
                devDependencies: true,
            }],
        },
    }],
}
