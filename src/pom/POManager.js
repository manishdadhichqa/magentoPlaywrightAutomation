const { DashBoardPage } = require("../pom/DashboardPage");
const { LoginPage } = require("../pom/LoginPage");
const { RegistrationPage } = require("../pom/RegistrationPage");
const {MyAccountPage} = require("../pom/MyAccountPage");
const {SearchProduct} = require("../pom/SearchProduct");
const {ProductPage} = require('../pom/ProductPage');
const {CartPage} = require('../pom/CartPage');
const {ShippingAddressPage} = require('../pom/ShippingAddressPage');

class POManager {
    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;
        this.DashBoardPage = new DashBoardPage(this.page);
        this.LoginPage = new LoginPage(this.page);
        this.RegistrationPage = new RegistrationPage(this.page);
        this.myAccountPage = new MyAccountPage(this.page);
        this.searchProduct = new SearchProduct(this.page);
        this.productPage = new ProductPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.shippingPage = new ShippingAddressPage(this.page);
    }

    getDashboardPage() {
        return this.DashBoardPage;
    }

    getLoginPage() {
        return this.LoginPage;
    }

    getRegistrationPage() {
        return this.RegistrationPage;
    }

    getMyAccountPage(){
        return this.myAccountPage;
    }

    getsearchProduct(){
        return this.searchProduct;
    }

    getProductPage(){
        return this.productPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getShippingPage(){
        return this.shippingPage;
    }
}

module.exports = {POManager};