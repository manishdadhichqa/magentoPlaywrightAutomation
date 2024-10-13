const {expect} = require('@playwright/test');
const exp = require('constants');

class ShippingAddressPage{
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page = page;
        //Shipping
        this.shippingAddress = page.getByText("Shipping Address");
        this.emailInput = page.getByLabel("login-email").first();
        this.firstNameInput = page.locator("[name='firstname']");
        this.lastNameInput = page.locator("[name='lastname']");
        this.addressInput = page.locator("[name='street[0]']");
        this.cityInput = page.locator("[name='city']");
        this.stateDropdown = page.locator("[name='region_id']");
        this.zipCodeInput = page.locator("[name='postcode']");
        this.countryDropDown = page.locator("[name='country_id']");
        this.mobileInput = page.locator("[name='telephone']");
        this.shippingMethod = page.getByText("Shipping Methods");
        this.selectRadio = page.locator("input.radio").first();
        this.nextButton = page.getByRole("button", {name: 'Next'});

        //Payment
        this.payMentMethod = page.getByText("Payment Method");
        this.placeOrderButton = page.getByRole("button", {name: "Place Order"});

        //Checkout Success
        this.purchaseConfirm = page.getByText("Thank you for your purchase!");
        this.checkOutOrderId = page.locator(".checkout-success p span");
    }

    async placeOrderDetail({emailAddress, firstname, lastname, address, city, stateName, zipcode, countryName, mobileNumber}){
        await expect(this.shippingAddress).toBeVisible();
        await this.emailInput.fill(emailAddress);
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.stateDropdown.selectOption({label: stateName});
        await this.zipCodeInput.fill(zipcode);
        await this.countryDropDown.selectOption({label: countryName});
        await this.mobileInput.fill(mobileNumber);
        await expect(this.shippingMethod).toBeVisible();
        await this.selectRadio.click();
        await this.nextButton.click();
        await expect(this.payMentMethod).toBeVisible();
        await this.placeOrderButton.click();
        await expect(this.purchaseConfirm).toBeVisible();
    }

    async doPayment(){
        
    }
}

module.exports = {ShippingAddressPage};