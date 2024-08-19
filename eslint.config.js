import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/strongly-recommended'],
    {
        plugins: {
            'typescript-eslint': tseslint.plugin,
        },
        files: ['**/*.{js,ts,vue}'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/html-indent': ['error', 4],
            'vue/object-curly-spacing': ['error', 'always'],
            'no-undef': 'off',
            'semi': ['error', 'never'],
            'indent': ['error', 4], 
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'always-multiline'],
            'object-curly-spacing': ['error', 'always'],
        },
    },
    {
        ignores: ['node_modules', 'vendor', 'dist', 'public'],
    },
]
