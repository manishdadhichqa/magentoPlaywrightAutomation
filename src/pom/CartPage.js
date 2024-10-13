const {expect} = require('@playwright/test');

class CartPage{
    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page){
        this.page = page;
        this.cartPageTitle = page.locator("[data-ui-id='page-title-wrapper']");
        this.itemTile = page.locator(".cart.item");
        this.itemInfo = this.itemTile.locator(".item-info");
        this.productItemName = this.itemInfo.locator(".product-item-name");
        this.itemAction = this.itemTile.locator(".item-actions");
        this.deleteItem = page.locator("a[title='Remove item']");
        this.emptyCart = page.locator(".cart-empty");
        this.proceedToCheckoutButton = page.getByRole("button", {name: 'Proceed to Checkout'});
    }

    async removeItemFromCart(){
        await expect(this.cartPageTitle).toBeVisible();
        await this.emptyCart.click();
        await expect(this.emptyCart).toBeVisible();
    }

    async clickOnCheckout(){
        await this.proceedToCheckoutButton.click();
    }
}

module.exports = {CartPage};