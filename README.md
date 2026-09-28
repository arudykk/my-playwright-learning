# Final Project — Playwright Test Suite

## Test target
SauceDemo (https://www.saucedemo.com)

## Covered user journey
Login → product selection → cart → checkout

## Test cases
- Valid user can log in
- Locked user cannot log in
- Wrong password shows an error message
- Empty username shows a validation error
- Cart badge shows correct count after adding a product
- Cart page shows the name of the selected product
- Removing a product updates the cart
- Adding multiple products shows correct badge count
- User can complete checkout and see success message

## Project structure
- `pages/` — Page Object classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
- `tests/` — test specs (*.spec.ts)
- `test-data/` — credentials and test inputs
- `playwright.config.ts` — configuration

## How to run
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## Notes
- No hard waits (`waitForTimeout`) are used
- Tests use semantic locators (`getByRole`, `getByPlaceholder`) and stable attribute
  locators (`[data-test="error"]`) where no semantic role applies
- Test data is stored separately from test logic, in `test-data/users.ts`
- The checkout test uses `test.step` to break the flow into readable, reportable steps

## Known limitations
- This suite covers only the selected user journey (login → cart → checkout)
- It does not cover all possible edge cases (e.g. sorting, product details page)