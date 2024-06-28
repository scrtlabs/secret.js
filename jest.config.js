/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 600_000,
  verbose: true,
  modulePathIgnorePatterns: ["dist", "scripts"],
  globalSetup: "<rootDir>/test/globalSetup.ts",
  // moduleNameMapper: {
  //     "^axios$": "axios/dist/node/axios.cjs"
  //   }
};