export type Credentials = {
  email: string;
  password: string;
  role?: string;  // ? means optional — can be missing
};

// Now TypeScript enforces this shape
export const validUser: Credentials = {
  email: "testuser@test.com",
  password: "User123",
};

export function getLoginUrl(env: string): string {
  return `https://${env}.example.com/login`;
}
