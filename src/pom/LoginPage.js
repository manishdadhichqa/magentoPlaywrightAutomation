const {expect} = require("@playwright/test")

class LoginPage{

    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */

    constructor(page){
        this.page = page
        //Account Exist
        this.customerLoginText = page.locator("text=Customer Login");
        this.registeredCustomersText = page.getByText("Registered Customers");
        this.emailInput = page.locator("input#email");
        this.passwordInput = page.locator("input#pass").first();
        this.signInButton = page.getByRole("button", {name:'Sign In'});
        this.wrongDetailsText = page.getByText('The account sign-in was incorrect');
        //ForgotPassword
        this.forgotPasswordLink = page.getByText("Forgot Your Password?");
        this.forgotPasswordHeaderText = page.getByText("Forgot Your Password?");
        this.forgotPwdInfo = page.locator(".field.note");
        this.forgotPassEmailInput = page.locator("#email_address");
        this.resetPasswordButton = page.getByRole("button", {name: 'Reset My Password'});
        this.resetPassAlertMsg = page.locator("[role='alert']");

        //Not Exist
        this.newCustomerHeaderText = page.getByText("New Customers");
        this.newCustDetailText = page.locator("div[aria-labelledby='block-new-customer-heading'] p").first();
        this.createAccount = page.locator(".primary a[href*='account/create/']").first();
        
    }

    async loginWithExistingUser(emailAddress, password, expectedSuccess = true){
        await expect(this.customerLoginText).toHaveText("Customer Login");
        await expect(this.registeredCustomersText).toHaveText("Registered Customers");
        await this.emailInput.fill(emailAddress);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        if(expectedSuccess){
            await expect(this.page).not.toHaveURL("/account/login/");
        }
        else{
            await expect(this.wrongDetailsText).toBeVisible();
            await expect(this.wrongDetailsText).toContainText("The account sign-in was incorrect")
        }
    }

    async forgotPassword(emailAddress){
        await this.forgotPasswordLink.click();
        await expect(this.forgotPasswordHeaderText).toHaveText("Forgot Your Password?");
        await expect(this.forgotPwdInfo).toContainText("Please enter your email address");
        await this.forgotPassEmailInput.fill(emailAddress);
        await this.resetPasswordButton.click();
        await expect(this.resetPassAlertMsg).toBeVisible();
        await expect(this.resetPassAlertMsg).toContainText(/If there is an account associated with .* you will receive an email/)
    }

    async userNotExist(){
        await expect(this.newCustomerHeaderText).toHaveText("New Customers");
        await expect(this.newCustDetailText).toHaveText("Creating an account has many benefits");
        await this.createAccount.click();
        await expect(this.page).toHaveURL(/.*\/account\/create\//) 
    }
}

module.exports = {LoginPage};