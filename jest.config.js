/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30_000,
  modulePathIgnorePatterns: ["dist", "scripts"],
  globalSetup: "<rootDir>/test/globalSetup.ts",
  globalTeardown: "<rootDir>/test/globalTeardown.js",
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  globals: {
    __SCRT_TEST_ACCOUNTS__: [],
  },
};
