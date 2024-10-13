const {expect} = require("@playwright/test");

class RegistrationPage {
    /**
     * 
     * @param {import ("@playwright/test").Page} page 
     */
    constructor(page){
        this.page = page;
        this.createNewAccountHeaderText = page.locator(".page-title").first();
        this.personalInfoText = page.getByText("Personal Information");
        this.firstNameInput = page.locator("#firstname");
        this.lastNameInput = page.locator("#lastname");
        //Sign-in Information
        this.signInInfoText = page.getByText("Sign-in Information");
        this.emailAddressInput = page.locator("#email_address");
        this.passwordInput = page.locator("[name='password']#password");
        this.confirmPassInput = page.locator("#password-confirmation");
        this.createAccountButton = page.getByRole("button", {name: 'Create an Account'});
    }

    async newUserAccout({firstname, lastname, emailAddress, password}, expectedsuccess = true){
        await expect(this.createNewAccountHeaderText).toContainText("Create New Customer Account");
        await expect(this.personalInfoText).toHaveText("Personal Information");
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await expect(this.signInInfoText).toHaveText("Sign-in Information");
        await this.emailAddressInput.fill(emailAddress);
        await this.passwordInput.fill(password);
        await this.confirmPassInput.fill(password);
        await this.createAccountButton.click();
        if(expectedsuccess){
            await expect(this.page).toHaveURL("/customer/account/");
        }else{
            throw new Error("Unable to create account")
        }
    }
}

module.exports = {RegistrationPage};