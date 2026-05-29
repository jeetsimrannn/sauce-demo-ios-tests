/**
 * Test suite for login feature.
 * This suite covers tests for successful login.
 */
const LoginPage = require('../pageobjects/LoginPage');
const userData = require('../data/users.js');

describe('Login Feature', () => {

    // Before each test, navigate to login page to ensure we are on the correct screen for login tests.
    beforeEach(async () => {
        await LoginPage.navigateToLogin();
    });

    // Perform login with valid credentials and verify that it redirects to products page.
    //  @param {Object} userData - User credentials for login
    it('should login successfully with valid credentials', async () => {
        await LoginPage.login(userData);
        await expect(LoginPage.productsTitle).toBeDisplayed();
    });
});