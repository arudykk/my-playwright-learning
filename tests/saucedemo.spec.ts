import { test, expect } from "@playwright/test";

test.describe("SauceDemo", () => {

  test.describe("Login flow", () => {

    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com");
    });

    test("Login (happy path)", async ({ page }) => {
      await page.getByPlaceholder("Username").fill("standard_user");
      await page.getByPlaceholder("Password").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page,
        "User should be redirected to the inventory page after valid login"
      ).toHaveURL(/inventory/);
    });

    test("Negative login — wrong password", async ({ page }) => {
      await page.getByPlaceholder("Username").fill("standard_user");
      await page.getByPlaceholder("Password").fill("wrong_password");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.locator('[data-test="error"]'),
        "Error should appear for wrong credentials"
      ).toBeVisible();
    });

    test("Empty form validation — no credentials", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.locator('[data-test="error"]'),
        "Error should appear when submitting empty form"
      ).toBeVisible();
    });

    test("Empty form validation — only username", async ({ page }) => {
      await page.getByPlaceholder("Username").fill("standard_user");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.locator('[data-test="error"]'),
        "Error should appear when password is missing"
      ).toBeVisible();
    });

    test("Empty form validation — only password", async ({ page }) => {
      await page.getByPlaceholder("Password").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.locator('[data-test="error"]'),
        "Error should appear when username is missing"
      ).toBeVisible();
    });

    test("Negative login — locked out user", async ({ page }) => {
      await page.getByPlaceholder("Username").fill("locked_out_user");
      await page.getByPlaceholder("Password").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
       page.locator('[data-test="error"]'),
       "Locked out user should see the exact lockout error message"
      ).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    });
//hihihi
  });
  

  test.describe("Authenticated user actions", () => {

    test.beforeEach(async ({ page }) => {
      await page.goto("https://www.saucedemo.com");
      await page.getByPlaceholder("Username").fill("standard_user");
      await page.getByPlaceholder("Password").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();
    });

    test("Add product to cart", async ({ page }) => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();

      await expect(
        page.locator(".shopping_cart_badge"),
        "Cart badge should show 1 item after adding a product"
      ).toHaveText("1");
    });

    test("Remove product from cart", async ({ page }) => {
      await page.getByRole("button", { name: "Add to cart" }).first().click();
      await page.getByRole("button", { name: "Remove" }).first().click();

      await expect(
        page.locator(".shopping_cart_badge"),
        "Cart badge should not be visible after removing product"
      ).not.toBeVisible();
    });

  });

});