import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
  }

  /**
   * Returns the "Add to cart" button for a specific product,
   * found by its visible name (e.g. "Sauce Labs Backpack").
   */
  addToCartButton(productName: string): Locator {
    return this.page
      .locator(".inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to cart" });
  }

  /**
   * Returns the "Remove" button for a specific product,
   * found by its visible name.
   */
  removeButton(productName: string): Locator {
    return this.page
      .locator(".inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Remove" });
  }

  async addProductToCart(productName: string) {
    await this.addToCartButton(productName).click();
  }

  async removeProductFromCart(productName: string) {
    await this.removeButton(productName).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}