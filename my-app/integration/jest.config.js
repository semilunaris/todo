module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
    testEnvironment: 'jest-environment-puppeteer',
    launch: {
        executablePath: puppeteer.executablePath(), 
        headless: true,
      },
}