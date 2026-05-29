/**
 * This test suite verifies the sorting functionality of the products.
 * It checks that products can be sorted by name (A-Z and Z-A) and by price (ascending and descending).
 * The tests ensure that the sorting options correctly rearrange the product listings as expected.
 */
const ProductsPage = require('../pageobjects/ProductsPage');

describe('Products Sort Feature', () => {

    // Before all tests, navigate to products catalog to start the checkout flow.
    beforeEach(async () => {
        await ProductsPage.catalogTab.waitForDisplayed(); 
        await ProductsPage.catalogTab.click();
    });

    // Test case for sorting products by name in ascending order (A-Z).
    it('should sort products by name A-Z', async () => {
        await ProductsPage.sortByNameAsc();
        const names = await ProductsPage.collectAllProducts();
        const sorted = [...names].sort();
        await expect(names).toEqual(sorted);
    });

    // Test case for sorting products by name in descending order (Z-A).
    it('should sort products by name Z-A', async () => {
        await ProductsPage.sortByNameDesc();
        const names = await ProductsPage.collectAllProducts();
        const sorted = [...names].sort().reverse();
        await expect(names).toEqual(sorted);
    });

    // Test case for sorting products by price in ascending order.
    it('should sort products by price ascending', async () => {
        await ProductsPage.sortByPriceAsc();
        const firstProductPrice = await ProductsPage.openFirstProductAndGetPrice();
        await ProductsPage.sortByPriceAsc();
        const lastProductPrice = await ProductsPage.openLastProductAndGetPrice();
        await expect(firstProductPrice).toBeLessThanOrEqual(lastProductPrice);
    });

    // Test case for sorting products by price in descending order.
    it('should sort products by price descending', async () => {
        await ProductsPage.sortByPriceDesc();
        const firstProductPrice = await ProductsPage.openFirstProductAndGetPrice();
        await ProductsPage.sortByPriceDesc();
        const lastProductPrice = await ProductsPage.openLastProductAndGetPrice();
        await expect(firstProductPrice).toBeGreaterThanOrEqual(lastProductPrice);
    });
});