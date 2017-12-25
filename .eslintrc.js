//За основу взят style-guide
//https://github.com/airbnb/javascript

module.exports = {
    parser: "babel-eslint",
    extends: ['airbnb'],
    plugins: [
        'jsx-a11y',
        'react',
        'import'
    ],
    env: {
        'browser': true,
    },
    globals: {
        'jest': true,
        'test': true,
        'expect': true,
        'describe': true,
        'afterEach': true,
        'afterAll': true,
        'beforeEach': true,
        'beforeAll': true,
        'MAIN_GATE': true
    },
    rules: {
        // CORRECTING AIRBNB SETTINGS
        // Best practices
        'complexity': ['error', 4], // цикломатическая сложность (id/else)
        'max-depth': ["error", 4], // глубина вложенностей в блоках
        'max-lines':  ["error", {"max": 200, "skipComments": true}],
        'max-len': ['error', 140, 2, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'max-params': ['error', 3],
        'max-statements': ['error', 100],
        'class-methods-use-this': "off",

        // imports
        'import/no-named-as-default': 'off',
        'import/no-unresolved': ['error', {commonjs: true, caseSensitive: true, ignore: ['controls']}],
        'import/no-extraneous-dependencies': ['off'], //можно включить тока нужно резолвы разрулить
        'import/extensions': ['error', {
            js: 'never',
            jsx: 'never',
        }],

        // Styles
        'linebreak-style': ["off", "windows"],
        //'semi': ['error', 'always', {"omitLastInOneLineBlock": true}],
        'semi': ['error', 'never'],
        'object-curly-spacing': ['error', 'never'],
        'no-underscore-dangle': ['off'],
        'indent': ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            FunctionExpression: {
                parameters: 1,
                body: 1
            }
        }],
        'camelcase': 'off',
        'no-return-assign': ["off"],
        'no-trailing-spaces': ["error", { "skipBlankLines": true }],
        'eol-last': ['error', 'never'],

        // ES6
        'prefer-template': 'off',
        'arrow-parens': ['error', 'always'],
        'padded-blocks': ['error', {
            blocks: "never",
            classes: "always",
            switches: 'never'
        }],

        // Errors
        'comma-dangle': ['error', {
            arrays: 'only-multiline',
            objects: 'only-multiline',
            imports: 'only-multiline',
            exports: 'only-multiline',
            functions: 'only-multiline',
        }],

        // React
        'react/sort-comp': "off",
        'react/require-default-props': "off",
        'react/jsx-filename-extension': ['error', {extensions: ['.js']}],
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/forbid-prop-types': ['error', { forbid: ['any'] }],
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
    }

};