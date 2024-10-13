const { expect } = require("allure-playwright");
const { error } = require("console");

class SearchProduct {
    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;
        this.searchInput = page.locator("#search");
        this.dropdownList = page.locator("#search_autocomplete ul li");
    }


    async searchProductInput(productName) {
        await this.searchInput.fill(productName);
        await this.page.waitForSelector('#search_autocomplete ul li', { state: 'visible' });

        const itemCount = await this.dropdownList.count();

        if (itemCount > 0) {
            await this.dropdownList.first().click();
        } else {
            throw new error('No items fount')
        }
    }




}

module.exports = { SearchProduct }