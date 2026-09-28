import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { standardUser, checkoutInfo } from "../test-data/users";

// TICKET 3 — Checkout flow
// As a shopper, I want to complete a purchase successfully.

test.describe("Checkout flow", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(standardUser.username, standardUser.password);
  });

  test("user can complete checkout and see success message", async ({ page }) => {
    await test.step("Add product and go to cart", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.goToCart();
    });

    await test.step("Go to checkout and fill information", async () => {
      await cartPage.goToCheckout();
      await checkoutPage.fillInformation(
        checkoutInfo.firstName,
        checkoutInfo.lastName,
        checkoutInfo.postalCode
      );
    });

    await test.step("Verify overview page shows the selected product", async () => {
      await expect(
        checkoutPage.overviewItemNames,
        "Overview page should show the product that was added to the cart"
      ).toHaveText(["Sauce Labs Backpack"]);
    });

    await test.step("Finish checkout and verify success message", async () => {
      await checkoutPage.finishCheckout();

      await expect(
        checkoutPage.successMessage,
        "Success message should be shown after completing checkout"
      ).toHaveText("Thank you for your order!");
    });
  });
});