import { test } from "@playwright/test";

test("работа со списком товаров на SauceDemo", async ({ page }) => {
  // Открываем сайт и логинимся
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // Находим список товаров
  const items = page.locator(".inventory_item");

  // Шаг 1: посчитать количество элементов через .count()
  const count = await items.count();
  console.log("Количество товаров:", count);

  // Шаг 2: кликнуть на 2-й элемент через .nth(1)
await items.nth(1).click();
await page.goto("https://www.saucedemo.com/inventory.html"); // прямой переход на список товаров

// Шаг 3: кликнуть по товару с конкретным текстом через .filter()
await page.locator(".inventory_item")
  .filter({ hasText: "Sauce Labs Backpack" })
  .click();
});


