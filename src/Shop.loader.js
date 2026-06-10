import products from "./debug-products.js";

export default async function loader() {
  // const response = await fetch('https://fakestoreapi.com/products');
  // const products = await response.json();
  //
  // console.log(products);

  return { products };
}
