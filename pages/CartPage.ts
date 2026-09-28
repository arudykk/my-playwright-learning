import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    // Names of all products currently listed on the cart page
    this.itemNames = page.locator(".cart_item .inventory_item_name");
  }

  /**
   * Returns the cart row (item) for a specific product,
   * found by its visible name (e.g. "Sauce Labs Backpack").
   */
  cartItem(productName: string): Locator {
    return this.page.locator(".cart_item").filter({ hasText: productName });
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}