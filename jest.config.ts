/* eslint-disable */
export default {
  displayName: 'zot-test-api',
  preset: './jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/zot-test-api',
  testMatch: [
    '<rootDir>/test/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/test/**/*(*.)@(spec|test).[jt]s?(x)',
  ],
};
