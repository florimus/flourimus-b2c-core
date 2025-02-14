/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@config': '<rootDir>/src/runtimeConfig',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@server/(.*)$': '<rootDir>/src/bin/$1',
    '^@controller/(.*)$': '<rootDir>/src/controller/$1',
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@service/(.*)$': '<rootDir>/src/service/$1',
    '^@statusCodes': '<rootDir>/src/core/statusCodes',
    '^@types': '<rootDir>/src/core/types.d.ts',
    '^@fixtures/(.*)$': '<rootDir>/src/__test__/fixtures/$1',
  },
  rootDir: './',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/', '/coverage/'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
