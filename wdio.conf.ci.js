/**
 * WebdriverIO configuration for running Appium iOS tests on CI (GitHub Actions)
 */
const path = require('path');

exports.config = {
    // Runner and Appium server port
    runner: 'local',
    port: 4723,

    // Test specs to run
    specs: [
        './test/specs/products.sort.spec.js'
    ],

    // Limit parallel test instances
    maxInstances: 1,

    // Device and app capabilities for iOS
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 16 Pro',
        'appium:platformVersion': '18.5',
        'appium:app': path.join(process.cwd(), 'apps/Payload/My Demo App.app'),
        'appium:automationName': 'XCUITest',
        'appium:noReset': false,
        'appium:fullReset': false
    }],

    // Logging and retry settings
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 600000,
    connectionRetryCount: 3,

    // Services and test framework
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],

    // Mocha options
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    }
};