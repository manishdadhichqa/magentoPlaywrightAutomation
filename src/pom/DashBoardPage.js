const { expect } = require("@playwright/test");
const { default: test } = require("node:test");

class DashBoardPage {
    /**
     * 
     * @param {import ("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;
        this.globalMsgText = page.locator(".message.global.demo");
        this.signInButton = page.locator("a[href*='account/login']").first();
        this.createAccountButton = page.locator("a[href*='customer/account/create']").first();
        this.cartButton = page.locator(".action.showcart");
        this.loggedInUserName = page.locator(".logged-in").first();
        this.userDropDownIcon = page.locator(".customer-welcome").first();
        this.dropdownItems = page.locator("(//ul[@class='header links'])[2]//li/a");
        this.siteLogo = page.locator("a.logo");
        this.hotDealsText = page.getByText("Hot Sellers");
        this.productItems = page.locator(".product-item");
        this.productSize = page.locator(".product-item-details .swatch-attribute.size").first();
        this.productColor = page.locator(".product-item-details .swatch-attribute.color").first();
        this.addToCartButton = page.locator(".product-item-inner .product-item-actions .action.tocart.primary");
        this.shippingCartLink = page.getByRole("link", {name: 'shopping cart'});


        this.UserDropdownItems = {
            MY_ACCOUNT: "My Account",
            MY_WISH_LIST: "My Wish List",
            SIGN_OUT: "Sign Out"
        };
    }

    async launchURL() {
        await this.page.goto("/");
    }

    async validateGlobalTextMessage() {
        const msg = await this.globalMsgText.textContent();
        expect(msg.trim()).toContain("hello@softwaretestingboard.com");
    }

    async clickOnSignIn() {
        await this.signInButton.click();
    }

    async clickOnCreateAccount() {
        await this.createAccountButton.click();
    }

    async validateUserName({ firstname, lastname }) {
        const userFullName = (await this.loggedInUserName.textContent()).trim();
        expect(userFullName).toBe(`Welcome, ${firstname} ${lastname}!`)
    }

    async handleDropdown(itemText) {
        await this.userDropDownIcon.click();
        const count = await this.dropdownItems.count();
        for (let i = 0; i < count; ++i) {
            const text = await this.dropdownItems.nth(i).textContent();
            if (text.trim() === itemText.trim()) {
                await this.dropdownItems.nth(i).click();
                return;
            }
        }
        throw new Error(`Dropdown item with text "${itemText}" not found.`);
    }

    async addProductToCart(){
        await expect(this.hotDealsText).toBeVisible();
        await this.productItems.first().hover();
        await this.productSize.click();
        await this.productColor.click();
        await this.addProductToCart.click();
        await this.shippingCartLink.click();
    }
}
module.exports = { DashBoardPage };