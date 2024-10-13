const {test, expect} = require("@playwright/test");
const {POManager} = require("../pom/POManager");
const {SignUpData} = require("../data/signUpData");
const {LoginData} = require("../data/loginData");

/** @type {POManager} */
let poManager;
let dashboardPage
test.beforeEach("Dashboard Test Cases", async({page}) => {
    poManager = new POManager(page);
    dashboardPage = poManager.getDashboardPage();
    await dashboardPage.launchURL();
})

test("Test 1.1: Validate Global Text", async ({page}) => {
    await dashboardPage.validateGlobalTextMessage();
})

test("Test 1.2: Validate User Full Name Text", async ({page}) => {
    await dashboardPage.clickOnSignIn();
    //Login Page
    const loginPage = poManager.getLoginPage();
    await loginPage.loginWithExistingUser(LoginData.validLoginDetails.validEmail, LoginData.validLoginDetails.password, true);
    await page.waitForLoadState('networkidle')
    //Dashboard Page
    await dashboardPage.validateUserName(SignUpData.signUpDetails)
})

test("Test 1.3: Validate User Dropdown", async ({page}) => {
    await dashboardPage.clickOnSignIn();
    //Login Page
    const loginPage = poManager.getLoginPage();
    await loginPage.loginWithExistingUser(LoginData.validLoginDetails.validEmail, LoginData.validLoginDetails.password, true);
    await page.waitForLoadState('networkidle')
    //Dashboard Page
    await dashboardPage.handleDropdown(dashboardPage.UserDropdownItems.SIGN_OUT);
})