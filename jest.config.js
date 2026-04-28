module.exports = {
  preset: '@react-native/jest-preset',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/types/**',
    '!src/utils/firebaseConfig.ts',
  ],
};