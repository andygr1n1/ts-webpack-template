module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    rules: {
        semi: ['warn', 'always'],
        quotes: ['error', 'single'],
        indent: ['warn', 4],
    },
}
