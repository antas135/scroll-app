import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "jsdom", // Use jsdom as the test environment for React testing
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Setup file for mocks and global setup
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Handle TypeScript files with ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"], // Extensions Jest should recognize
  globals: {
    "ts-jest": {
      isolatedModules: true, // Improve compilation speed (optional)
    },
  },
};

export default config;
