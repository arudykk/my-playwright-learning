import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { standardUser, lockedOutUser, wrongPasswordUser, errorMessages } from "../test-data/users";

// TICKET 1 — Login regression
// As a user, I want to log in only with valid credentials, so that my account is protected.

test.describe("Login regression", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("standard_user can log in and sees inventory page", async ({ page }) => {
    await loginPage.login(standardUser.username, standardUser.password);

    await expect(
      page,
      "User should be redirected to the inventory page after valid login"
    ).toHaveURL(/inventory/);
  });

  test("locked_out_user cannot log in and sees error", async () => {
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);

    await expect(
      loginPage.errorMessage,
      "Locked out user should see the exact lockout error message"
    ).toHaveText(errorMessages.lockedOut);
  });

  test("wrong password shows error message", async () => {
    await loginPage.login(wrongPasswordUser.username, wrongPasswordUser.password);

    await expect(
      loginPage.errorMessage,
      "Error should be visible for wrong credentials"
    ).toBeVisible();
  });

  test("empty username shows validation error", async () => {
    await loginPage.passwordInput.fill(standardUser.password);
    await loginPage.loginButton.click();

    await expect(
      loginPage.errorMessage,
      "Error should be visible when username is missing"
    ).toBeVisible();
  });
});