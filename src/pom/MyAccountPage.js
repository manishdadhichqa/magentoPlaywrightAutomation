const {expect} = require("@playwright/test");
const exp = require("constants");

class MyAccountPage{
    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page){
        this.page = page;
        this.myAccountPageTitle = page.locator("[data-ui-id='page-title-wrapper']");
        this.contactInfoBox = page.locator(".box.box-information");
        this.contactInfoText = this.contactInfoBox.locator(".box-content p");
        this.successRegistrationAlert = page.locator("[role='alert']").last();
    }

    async validateContactInfo({firstname, lastname, emailAddress}){
        await expect(this.myAccountPageTitle).toContainText('My Account');
        await expect(this.contactInfoBox.locator("strong")).toContainText("Contact Information");
        const contactText = await this.contactInfoText.textContent();
        const [name, email] = contactText.trim().split('\n').map(line => line.trim())
        expect(name).toBe(`${firstname} ${lastname}`);
        expect(email).toBe(emailAddress);

    }
    async validateSuccessAlert(){
        await expect(this.successRegistrationAlert).toContainText("Thank you for registering");
    }
}

module.exports = {MyAccountPage};