const { test, expect } = require("@playwright/test");
const { POManager } = require("../pom/POManager");
const {ShippingData} = require("../data/ShippingData");

/** @type {POManager} */
let poManager;
/** @type {DashBoardPage} */
let dashboardPage;
test.beforeEach("Product Test Cases", async ({ page }) => {
    poManager = new POManager(page);
    dashboardPage = poManager.getDashboardPage();
    await dashboardPage.launchURL();
})

test("Test 4.1: Add Product to Cart", async ({ page }) => {
    const searchProduct = poManager.getsearchProduct();
    //Step2: Search for a product (e.g., ‘jacket’)
    //Step3: Click on a product from the search results.
    await searchProduct.searchProductInput('jacket');

    const productPage = poManager.getProductPage();
    //Step4: Select size and color (if available).
    //Step5: Click Add to Cart.
    //Step6: Verify that the product is added to the cart.
    await productPage.selectSizeColorAndAddToCart();
})

test("Test 4.2: Remove Product from Cart", async ({ page }) => {
    const searchProduct = poManager.getsearchProduct();
    await searchProduct.searchProductInput('jacket');

    const productPage = poManager.getProductPage();
    await productPage.selectSizeColorAndAddToCart();
    await productPage.clickOnShoppingCart();

    // Open the cart by clicking the cart icon.
    // Click Remove for the selected product.
    // Verify that the product is removed from the cart.
    const cartPage = poManager.getCartPage();
    await cartPage.removeItemFromCart();
})

test("Test 4.3: Checkout Process with Guest User", async ({ page }) => {

    // Add a product to the cart.
    // Click on the cart icon and proceed to checkout.
    await dashboardPage.addProductToCart();
    // Select the option for Guest Checkout.
    const cartPage = poManager.getCartPage();
    await cartPage.clickOnCheckout();
    // Enter billing details (name, address, email, phone).
    // Select a shipping method.
    // Enter payment details (use dummy card data if necessary).
    // Click Place Order.
    // Verify that an order confirmation message is displayed.
    const shippingPage = poManager.getShippingPage();
    shippingPage.placeOrderDetail(ShippingData.shippingDetails);
})