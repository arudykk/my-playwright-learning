import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  // Step One: information form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Step Two: overview
  readonly finishButton: Locator;
  readonly overviewItemNames: Locator;

  // Step Three: complete
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step One locators
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postalCodeInput = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    // Same "data-test" attribute pattern as the login error message.
    this.errorMessage = page.locator('[data-test="error"]');

    // Step Two locators
    this.finishButton = page.getByRole("button", { name: "Finish" });
    // Product names shown on the order overview page
    this.overviewItemNames = page.locator(".cart_item .inventory_item_name");

    // Step Three locators
    this.successMessage = page.locator(".complete-header");
  }

  /**
   * Fills out the "Checkout: Your Information" form (Step One)
   * and clicks Continue.
   */
  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Clicks Finish on the "Checkout: Overview" page (Step Two).
   */
  async finishCheckout() {
    await this.finishButton.click();
  }

  /**
   * Runs the full checkout flow: fills the information form,
   * then finishes on the overview page.
   */
  async completeCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.fillInformation(firstName, lastName, postalCode);
    await this.finishCheckout();
  }
}