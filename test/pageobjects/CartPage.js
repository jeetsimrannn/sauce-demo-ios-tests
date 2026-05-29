/**
 * Page object for the cart screen.
 * Contains selectors and methods for interacting with the cart.
 */
class CartPage {

    get cartTab() { return $('//XCUIElementTypeButton[@name="Cart-tab-item"]'); }
    get myCartTitle() { return $('//XCUIElementTypeStaticText[@name="My Cart"]') }
    get proceedToCheckoutButton() { return $('//XCUIElementTypeButton[@name="ProceedToCheckout"]'); }

    // Navigate to the cart screen by clicking on the cart tab.
    async navigateToCart() {
        await this.cartTab.waitForDisplayed();
        await this.cartTab.click();
    }
    
    // Click on the proceed to checkout button to start the checkout process.
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.waitForDisplayed();
        await this.proceedToCheckoutButton.click();
    }
}

module.exports = new CartPage();