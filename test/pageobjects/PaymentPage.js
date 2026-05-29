/**
 * Page object for the payment screen.
 * Contains selectors and methods for filling payment form
 * during checkout process.
 */
class PaymentPage {

    get fullNameField(){ return $('//XCUIElementTypeTextField[@value="Maxim Winter"]'); }
    get cardNumberField(){ return $('//XCUIElementTypeTextField[@value="3258 1265 7568 7896"]'); }
    get expirationDateField(){ return $('//XCUIElementTypeTextField[@value="03/25"]'); }
    get securityCodeField(){ return $('//XCUIElementTypeTextField[@value="123"]'); }
    get reviewOrderButton() { return $('//XCUIElementTypeButton[@name="Review Order"]'); }

    // Fill payment form with checkout data.
    //  @param {Object} data - Checkout payment data
    async fillPaymentForm(data) {
        await this.fullNameField.setValue(data.fullName);
        await this.cardNumberField.setValue(data.cardNumber);
        await this.expirationDateField.setValue(data.expirationDate);
        await this.securityCodeField.setValue(data.securityCode);
    }

    // Submits payment form and proceed to review order screen.
    //  @param {Object} data - Checkout payment data
    async proceedTOReview(data) {
        await this.fillPaymentForm(data)
        await this.reviewOrderButton.waitForDisplayed();
        await this.reviewOrderButton.click();
    }
}

module.exports = new PaymentPage();