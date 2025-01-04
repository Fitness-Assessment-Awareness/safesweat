/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/', '__tests__/'],
    coverageProvider: 'v8',
    preset: 'jest-expo',
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@sentry/.*|@dev-plugins/react-query)',
    ],
    testMatch: ['**/__tests__/**/*.+(spec|test).[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    setupFilesAfterEnv: ['./app/__tests__/setupFile.ts'],
};

module.exports = config;
