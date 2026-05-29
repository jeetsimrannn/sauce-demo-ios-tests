/**
 * Page object for the products screen.
 * Contains selectors and methods used for to add product to cart and to sort products by name and price.
 */
class ProductsPage {

    get catalogTab() { return $('//XCUIElementTypeButton[@name="Catalog-tab-item"]'); }
    get firstProductImage() { return $('(//XCUIElementTypeImage[@name="Product Image"])[1]'); }
    get addToCartButton() { return $('//XCUIElementTypeButton[@name="AddToCart"]'); }
    get productsTitle() { return $('//XCUIElementTypeStaticText[@name="title"]'); }

    get sortButton() {return $('//XCUIElementTypeButton[@name="Button"]'); }
    get sortNameAsc() { return $('//XCUIElementTypeButton[@name="Name - Ascending"]'); }
    get sortNameDesc() { return $('//XCUIElementTypeButton[@name="Name - Descending"]');}
    get sortPriceAsc() { return $('//XCUIElementTypeButton[@name="Price - Ascending"]');}
    get sortPriceDesc() { return $('//XCUIElementTypeButton[@name="Price - Descending"]');}
    get productNames() { return $$('//XCUIElementTypeStaticText[@name="Product Name"]');}
    get footerIcon() { return $('//XCUIElementTypeButton[@name="Facebook Icons"]');}
    get lastProductImage() { return $('(//XCUIElementTypeImage[@name="Product Image"])[3]'); }
    get productPrices() { return $('//XCUIElementTypeStaticText[@name="Price"]');}
    get backButton() { return $('//XCUIElementTypeOther[@name="ProductDetails-screen"]/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeButton'); }
    
    // Navigate to the products page by clicking on the Catalog tab.
    // If already on the products page, it will not click the Catalog tab again.
    async navigateToCatalog() {
        if (await this.productsTitle.isDisplayed().catch(() => false)) { 
            return; 
        } 
        await this.catalogTab.waitForDisplayed(); 
        await this.catalogTab.click();
    }

    // Open the first product details by clicking on the first product image.
    async openFirstProduct() {
        await this.navigateToCatalog();
        await this.firstProductImage.waitForDisplayed();
        await this.firstProductImage.click();
    }

    // Add to the cart by opening its details and clicking the Add to Cart button.
    async addFirstProductToCart() {
        await this.openFirstProduct();
        await this.addToCartButton.waitForDisplayed();
        await this.addToCartButton.click();
    }

    // Open the sort menu by clicking on the sort button.
    async openSortMenu() {
        await this.sortButton.waitForDisplayed();
        await this.sortButton.click();
    }

    // Sort products by name in ascending order (A-Z).
    async sortByNameAsc() {
        await this.openSortMenu();
        await this.sortNameAsc.waitForDisplayed();
        await this.sortNameAsc.click();
    }

    // Sort products by name in descending order (Z-A).
    async sortByNameDesc() {
        await this.openSortMenu();
        await this.sortNameDesc.waitForDisplayed();
        await this.sortNameDesc.click();
    }
    
    // Sort products by price in ascending order.
    async sortByPriceAsc() {
        await this.openSortMenu();
        await this.sortPriceAsc.waitForDisplayed();
        await this.sortPriceAsc.click();
    }

    // Sort products by price in descending order.
    async sortByPriceDesc() {
        await this.openSortMenu();
        await this.sortPriceDesc.waitForDisplayed();
        await this.sortPriceDesc.click();
    }

    // Get the names of all visible products on the screen.
    async getVisibleProductNames() {
        const elements = await $$('//XCUIElementTypeStaticText[@name="Product Name"]');
        const names = [];
        for (const el of elements) {
            const text = await el.getText();
            names.push(text);
        }
        return names;
    }

    // Collect the names of all products by scrolling through the product list until the end is reached.
    async collectAllProducts() {
        const allProducts = new Set();
        while (!(await this.footerIcon.isDisplayed().catch(() => false))) {
            const visibleProducts = await this.getVisibleProductNames();
            visibleProducts.forEach(p => allProducts.add(p));
            await driver.execute('mobile: swipe', {direction: 'up'});
        }
        const visibleProducts = await this.getVisibleProductNames();
        visibleProducts.forEach(p => allProducts.add(p));
        return Array.from(allProducts);
    }

    // Extracts the price value from the product details screen and converts it to a number.
    async getProductPriceFromDetail() {
        const text = await this.productPrices.getText();
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }

    // Opens the first product details, retrieves its price, and then navigates back to the products page.
    async openFirstProductAndGetPrice() {
        await this.firstProductImage.waitForDisplayed();
        await this.firstProductImage.click();
        const price = await this.getProductPriceFromDetail();
        await this.backButton.click();
        return price;
    }

    // Scrolls to the last product, opens its details, retrieves its price, and then navigates back to the products page.
    async openLastProductAndGetPrice() {
        while (!(await this.footerIcon.isDisplayed().catch(() => false))) {
            await driver.execute('mobile: swipe', {direction: 'up'});
        }
        await this.lastProductImage.waitForDisplayed();
        await this.lastProductImage.click();
        const price = await this.getProductPriceFromDetail();
        await this.backButton.click();
        return price;
    }
}

module.exports = new ProductsPage();