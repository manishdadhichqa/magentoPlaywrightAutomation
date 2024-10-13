const { expect } = require('@playwright/test');
const { error } = require('console');

class ProductPage {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.productPageTitle = page.locator("[data-ui-id='page-title-wrapper']");
        this.productCard = page.locator(".item.product.product-item");
        this.productName = page.locator(".product-item-name");
        this.productSize = page.locator(".swatch-option.text");
        this.productColor = page.locator(".swatch-option.color");
        this.addToCartButton = page.getByRole("button", { name: 'Add to Cart' });
        this.productAddedAlert = page.locator("[role='alert']");
        this.shoppingCartLink = this.productAddedAlert.getByRole("link", { name: 'shopping cart' });
    }

    async selectSizeColorAndAddToCart() {
        await expect(this.productPageTitle).toBeVisible();
        const sizeOption = this.productSize.first();
        await expect(sizeOption).toBeVisible(); 
        await sizeOption.click(); 
        const colorOption = this.productColor.first();
        await expect(colorOption).toBeVisible(); 
        await colorOption.click(); 
        await this.addToCartButton.click();
        await expect(this.productAddedAlert).toContainText('You added');
    }

    async clickOnShoppingCart(){
        await this.shoppingCartLink.click();
    }
}
module.exports = { ProductPage };