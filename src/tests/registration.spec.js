const {test, expect} = require("@playwright/test");
const {POManager} = require("../pom/POManager");
const {SignUpData} = require("../data/signUpData");

/** @type {POManager} */
let poManager;
let dashboardPage;
test.beforeEach("Registration Test Cases", async ({page}) => {
    poManager = new POManager(page);
    dashboardPage = poManager.getDashboardPage();
    await dashboardPage.launchURL();
})

test("Test 3.1: Register with Valid Credentials", async ({page}) => {
    await dashboardPage.validateGlobalTextMessage();
    await dashboardPage.clickOnCreateAccount();
    
    //Registration Page
    const registrationPage = poManager.getRegistrationPage();
    await registrationPage.newUserAccout(SignUpData.signUpDetails, true)

    //My Account Page
    const myAccountPage = poManager.getMyAccountPage();
    await myAccountPage.validateSuccessAlert();

})