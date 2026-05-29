/**
 * Page object for the login screen.
 * Contains selectors and methods used for login process.
 */
class LoginPage {

    get usernameField() { return $('//XCUIElementTypeTextField'); }
    get passwordField() { return $('//XCUIElementTypeSecureTextField'); }
    get loginButton() { return $('//XCUIElementTypeButton[@name="Login"]'); }
    get moreTab() { return $('//XCUIElementTypeButton[@name="More-tab-item"]'); }
    get demoUserAutoFill() { return $('//XCUIElementTypeStaticText[@name="bob@example.com"]'); }
    get productsTitle() { return $('//XCUIElementTypeStaticText[@name="title"]'); }

    // Navigate to the login screen by clicking on the More tab and selecting the Login option.
    async navigateToLogin() {
        await this.moreTab.waitForDisplayed();
        await this.moreTab.click();
        const loginOption = await $('//XCUIElementTypeOther[@name="Login Button"]');
        await loginOption.waitForDisplayed();
        await loginOption.click();
    }

    // Perform login using provided user credentials.
    //  @param {Object} users - User credentials for login
    async login(users) {
        await this.usernameField.waitForDisplayed();
        await this.usernameField.setValue(users.validUser.username);
        await this.passwordField.setValue(users.validUser.password);
        await this.loginButton.waitForDisplayed();
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();