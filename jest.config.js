module.exports = {
  roots: [`<rootDir>/__tests__/`],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "node"],
  "moduleNameMapper": {
    "^@\/(.*)$": "<rootDir>/packages/$1"
  } 
};
