/**
 * Test suite for checkout feature without logged in user.
 * This suite covers the entire checkout flow starting from adding a product to the cart, 
 * proceeding through the checkout steps, logging in user and completing the order.
 */
const LoginPage = require('../pageobjects/LoginPage.js');
const ProductsPage = require('../pageobjects/ProductsPage.js');
const CartPage = require('../pageobjects/CartPage.js');
const AddressPage = require('../pageobjects/AddressPage.js');
const PaymentPage = require('../pageobjects/PaymentPage.js');
const ReviewPage = require('../pageobjects/ReviewPage.js');
const checkoutData = require('../data/checkout.data.js');
const userData = require('../data/users.js');

describe('Checkout Feature without Logged in User', () => {

    // Before all tests, navigate to products catalog to start the checkout flow.
    before(async () => {
        await ProductsPage.navigateToCatalog();
    });

    // Add a product to the cart, navigate to cart and proceed to checkout which should redirect to login page.
    it('should add a product to the cart, navigate to cart and proceed to login page successfully', async () => {
        await ProductsPage.addFirstProductToCart();
        await CartPage.navigateToCart();
        await expect(CartPage.myCartTitle).toBeDisplayed();
        await CartPage.proceedToCheckout();
        await expect(LoginPage.loginButton).toBeDisplayed();
    });

    // Perform login and verify that it redirects to address form page.
    //  @param {Object} userData - User credentials for login
    it('should login and redirect to address form page successfully', async () => {
        await LoginPage.login(userData);
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