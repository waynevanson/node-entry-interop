import { Config } from "@jest/types"

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageThreshold: { global: 100 },
  passWithNoTests: true,
} as Config.InitialOptions
