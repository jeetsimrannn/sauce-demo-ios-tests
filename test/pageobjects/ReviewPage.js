/**
 * Page object for the review screen.
 * Contains selectors and methods used to complete checkout.
 */
class ReviewPage {

    get placeOrderButton() { return $('//XCUIElementTypeButton[@name="Place Order"]'); }
    get checkoutCompleteText() { return $('//XCUIElementTypeStaticText[@name="Checkout Complete"]'); }
    get continueShoppingButton() { return $('//XCUIElementTypeButton[@name="ContinueShopping"]'); }

    // Clicks the Place Order button to complete the checkout process.
    async completeCheckout() {
        await this.placeOrderButton.waitForDisplayed();
        await this.placeOrderButton.click();
    }
}

module.exports = new ReviewPage();