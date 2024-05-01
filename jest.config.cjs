module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  roots: ["<rootDir>/src/"],
  moduleNameMapper: {
    "^@testing-library/jest-dom/extend-expect":
      "<rootDir>/node_modules/@testing-library/jest-dom/extend-expect",
  },
};