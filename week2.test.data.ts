// You can define the shape of an object with a "type"
type Product = {
  name: string;
  price: number;
  inStock: boolean;  
};

// Now TypeScript enforces this shape
const apple: Product = {
  name: "apple",
  price: 9.99,
  inStock: true,
};

const orange: Product = {
  name: "orange",
  price: 19.99,
  inStock: false,
};



function formatPrice(price: number): string {
  return `$${price}`;
}

console.log(formatPrice(apple.price));
console.log(formatPrice(orange.price));
