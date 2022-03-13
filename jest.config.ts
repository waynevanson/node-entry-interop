import { Config } from "@jest/types"

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageThreshold: { global: 100 },
} as Config.InitialOptions
