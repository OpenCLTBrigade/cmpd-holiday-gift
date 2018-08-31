module.exports = wallaby => {
  process.env.NODE_PATH = require('path').join(__dirname, '../../node_modules');
  return {
    files: ['src/**/*.ts*', '!src/**/*.test.ts*', 'package.json', 'tsconfig.json'],
    tests: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    filesWithNoCoverageCalculated: ['src/**/*.mock.ts*'],
    env: {
      kind: 'chrome',
      type: 'node',
      runner: 'node'
    },
    debug: true,
    testFramework: 'jest',
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React'
      })
    },
    setup: function(wallaby) {
      const jestConfig = require('./package.json').jest;
      // for example:
      // jestConfig.globals = { "__DEV__": true };
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
