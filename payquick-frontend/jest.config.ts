import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom", // Next.js requires jsdom for browser APIs like fetch
    moduleNameMapper: {
        "^@/lib/(.*)$": "<rootDir>/src/lib/$1", // alias mapping
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
