# Test Plan — SauceDemo Final Project

**Track:** A — SauceDemo
**Journey:** Login → Add products → Cart → Checkout
**Site:** https://www.saucedemo.com

This document lists the required test cases before writing any code.

---

## 1. Login

### 1.1 Valid user can log in and see inventory page
- Open the login page
- Enter valid credentials (`standard_user` / `secret_sauce`)
- Click Login
- **Expected:** user is redirected to the inventory page (URL contains `inventory`)

### 1.2 Locked out user cannot log in and sees correct error
- Enter `locked_out_user` / `secret_sauce`
- Click Login
- **Expected:** error message is shown: "Epic sadface: Sorry, this user has been locked out."

---

## 2. Cart

### 2.1 User can add two products to cart and verify badge count
- Log in
- Add first product to cart
- Add second product to cart
- **Expected:** cart badge shows "2"

### 2.2 User can remove one product and verify cart updates
- Log in
- Add two products to cart
- Remove one product
- **Expected:** cart badge updates to "1"

---

## 3. Checkout

### 3.1 User can complete checkout and see success message
- Log in
- Add a product to cart
- Open the cart and click Checkout
- Fill in required checkout information (First Name, Last Name, Zip/Postal Code)
- Click Continue, then Finish
- **Expected:** success message is shown (e.g. "Thank you for your order!")

---

## Notes
- This is the minimum required set of test cases for the final project.
- More test cases may be added later as work progresses.
