module.exports = {
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
        'bundle-loader': '<rootDir>/src/tools/tests-fixtures/bundleLoaderMock.js'
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
    snapshotSerializers: [
        '<rootDir>/node_modules/enzyme-to-json/serializer'
    ],
    automock: false,
    collectCoverage: false,
    collectCoverageFrom: ['**/src/**'],
    coverageReporters: [
        'text'
    ],
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/tools/', '.snap', '.json'],
    notify: true,
    setupTestFrameworkScriptFile: './setupJest.js'
}