/**
 * Test suite for checkout feature with a logged in user.
 * This suite covers the entire checkout flow starting from adding a product to the cart, 
 * proceeding through the checkout steps, and completing the order.
 */
const LoginPage = require('../pageobjects/LoginPage.js');
const ProductsPage = require('../pageobjects/ProductsPage.js');
const CartPage = require('../pageobjects/CartPage.js');
const AddressPage = require('../pageobjects/AddressPage.js');
const PaymentPage = require('../pageobjects/PaymentPage.js');
const ReviewPage = require('../pageobjects/ReviewPage.js');
const checkoutData = require('../data/checkout.data.js');
const userData = require('../data/users.js');

describe('Checkout Feature with Logged in User', () => {

    // Before all tests, navigate to login page and perform login with valid credentials.
    //  @param {Object} userData - User credentials for login
    before(async () => {
        await LoginPage.navigateToLogin();
        await LoginPage.login(userData);
    });

    // Add a product to the cart, navigate to cart and proceed to checkout.
    it('should add a product to the cart, navigate to cart and proceed to checkout', async () => {
        await ProductsPage.addFirstProductToCart();
        await CartPage.navigateToCart();
        await expect(CartPage.myCartTitle).toBeDisplayed();
        await CartPage.proceedToCheckout();
        await expect(AddressPage.toPaymentButton).toBeDisplayed();
    });

    // Fill address form and proceed to payment page.
    //  @param {Object} checkoutData - Checkout address data
    it('should fill address form and redirect to payment page successfully', async () => {
        await AddressPage.proceedToPayment(checkoutData);
        await expect(PaymentPage.reviewOrderButton).toBeDisplayed();
    });

    // Fill payment form and proceed to review order page.
    //  @param {Object} checkoutData - Checkout payment data
    it('should fill payment form and redirect to review order page successfully', async () => {
        await PaymentPage.proceedTOReview(checkoutData);
        await expect(ReviewPage.placeOrderButton).toBeDisplayed();
    });

    // Complete the checkout process by placing the order and verifying the completion message.
    it('should proceed with completing order', async () => {
        await ReviewPage.completeCheckout();
        await expect(ReviewPage.checkoutCompleteText).toBeDisplayed();
    });

});