const {test, expect} = require("@playwright/test");
const {POManager} = require("../pom/POManager");
const {LoginData} = require("../data/loginData");

let poManager;
let dashboardPage;
test.beforeEach("Login Test Cases", async ({page}) => {
    poManager = new POManager(page);
    dashboardPage = poManager.getDashboardPage();
    await dashboardPage.launchURL();
})

test("Test 2.1: Login with Invalid Credentials", async ({page}) => {
    await dashboardPage.clickOnSignIn();
    //Login Page
    const loginPage = poManager.getLoginPage();
    await page.waitForLoadState('networkidle');
    await loginPage.loginWithExistingUser(LoginData.inValidLoginDetails.invalidEmail, LoginData.inValidLoginDetails.invalidPassword, false);
})

test("Test 2.1: Login with Valid Credentials", async ({page}) => {
    await dashboardPage.clickOnSignIn();
    //Login Page
    const loginPage = poManager.getLoginPage();
    await loginPage.loginWithExistingUser(LoginData.validLoginDetails.validEmail, LoginData.validLoginDetails.password, true);
})