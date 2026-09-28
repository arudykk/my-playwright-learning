import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { standardUser } from "../test-data/users";

// TICKET 2 — Cart behavior
// As a shopper, I want my cart to update correctly when I add or remove products.

test.describe("Cart behavior", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(standardUser.username, standardUser.password);
  });

  test("cart badge shows correct count after adding a product", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");

    await expect(
      inventoryPage.cartBadge,
      "Cart badge should show 1 after adding a product"
    ).toHaveText("1");
  });

  test("cart page shows the name of the selected product", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.goToCart();

    await expect(
      cartPage.itemNames,
      "Cart page should show the name of the product that was added"
    ).toHaveText(["Sauce Labs Backpack"]);
  });

  test("removing a product updates the cart", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.removeProductFromCart("Sauce Labs Backpack");

    await expect(
      inventoryPage.cartBadge,
      "Cart badge should not be visible after removing the only product"
    ).not.toBeVisible();
  });

  test("adding multiple products shows correct badge count", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");

    await expect(
      inventoryPage.cartBadge,
      "Cart badge should show 2 after adding two products"
    ).toHaveText("2");
  });
});