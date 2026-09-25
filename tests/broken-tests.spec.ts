import { test, expect } from "@playwright/test";

test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});
/**
 * Root cause:      placeholder text was "User Name" but the actual
 *                  placeholder on the page is "Username" (no space),
 *                  so getByPlaceholder("User Name") matched no element.
 * Fix:             Changed getByPlaceholder("User Name") to
 *                  getByPlaceholder("Username").
 * How I verified:  Ran npx playwright test tests/broken-tests.spec.ts
 *                  --headed and confirmed the test passes.
 */

test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"   // ← is this the exact text?
  );
});
/**
 * Root cause:      getByTestId("error") looks for data-testid="error",
 *                  but the actual element uses data-test="error"
 *                  (different attribute). Also the expected text was
 *                  missing the "Epic sadface: " prefix.
 * Fix:             Changed locator to page.locator('[data-test="error"]')
 *                  and corrected the expected text.
 * How I verified:  Ran npx playwright test tests/broken-tests.spec.ts
 *                  --headed, saw the error banner, and confirmed pass.
 */
test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});
/**
 * Root cause:      Missing "await" before .click() on the add-to-cart
 *                  button. Without it, the code doesn't wait for the
 *                  click to finish before the next line runs. The test
 *                  still passed by luck because expect().toHaveText()
 *                  has its own retry logic — making this a flaky test.
 * Fix:             Added "await" before the .click() call.
 * How I verified:  Ran npx playwright test tests/broken-tests.spec.ts
 *                  several times in a row to confirm consistent passing.
 */