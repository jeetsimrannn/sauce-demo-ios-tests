/**
 * Page object for the address form screen.
 * Contains selectors and methods for filling address form
 * during checkout process.
 */
class AddressPage {

    get fullNameField(){ return $('//XCUIElementTypeTextField[@value="Rebecca Winter"]'); }
    get addressLineField(){ return $('//XCUIElementTypeTextField[@value="Mandorley 112"]'); }
    get cityField(){ return $('//XCUIElementTypeTextField[@value="Truro"]'); }
    get stateField(){ return $('//XCUIElementTypeTextField[@value="Cornwall"]'); }
    get zipField(){ return $('//XCUIElementTypeTextField[@value="89750"]'); }
    get countryField(){ return $('//XCUIElementTypeTextField[@value="United Kingdom"]'); }
    get toPaymentButton() { return $('//XCUIElementTypeButton[@name="To Payment"]'); }

    // Fill address fields with checkout data.
    //  @param {Object} data - Checkout address data
    async fillAddressForm(data) {
        await this.fullNameField.waitForDisplayed();
        await this.fullNameField.setValue(data.fullName);
        await this.addressLineField.setValue(data.addressLine);
        await this.cityField.setValue(data.city);
        await this.stateField.setValue(data.state);
        await this.zipField.setValue(data.zip);
        await this.countryField.setValue(data.country);
    }
    
    // Submits address form and continue to payment.
    //  @param {Object} data - Checkout address data
    async proceedToPayment(data) {
        await this.fillAddressForm(data);
        await this.toPaymentButton.waitForDisplayed();
        await this.toPaymentButton.click();
    }
}

module.exports = new AddressPage();