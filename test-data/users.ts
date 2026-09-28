export type User = {
  username: string;
  password: string;
};

export const standardUser: User = {
  username: "standard_user",
  password: "secret_sauce",
};

export const lockedOutUser: User = {
  username: "locked_out_user",
  password: "secret_sauce",
};

export const wrongPasswordUser: User = {
  username: "standard_user",
  password: "wrong_password",
};

export const errorMessages = {
  lockedOut: "Epic sadface: Sorry, this user has been locked out.",
  wrongCredentials:
    "Epic sadface: Username and password do not match any user in this service",
};

export const checkoutInfo = {
  firstName: "John",
  lastName: "Doe",
  postalCode: "12345",
};