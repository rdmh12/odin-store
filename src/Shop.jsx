import { useLoaderData, useOutletContext } from "react-router-dom";
import Product from "./Product.jsx";
import styles from "./Shop.module.css";
import ShoppingCart from "./ShoppingCart.js";

export default function Shop() {
  const { products } = useLoaderData();
  const [cart, setCart] = useOutletContext();

  const amountDecreasedHandler = (product) => {
    const newCart = new ShoppingCart(cart);
    newCart.decreaseAmount(product);
    setCart(newCart);
  };

  const amountIncreasedHandler = (product) => {
    const newCart = new ShoppingCart(cart);
    newCart.increaseAmount(product);
    setCart(newCart);
  };

  return (
    <>
      <h1>Shop</h1>
      <div className={styles.content} data-testid="shop-products">
        {products.length &&
          products.map((product) => (
            <Product
              key={product.id}
              product={product}
              amount={cart.getAmount(product.id)}
              onAmountDecreased={() => {
                amountDecreasedHandler(product);
              }}
              onAmountIncreased={() => {
                amountIncreasedHandler(product);
              }}
            />
          ))}
      </div>
    </>
  );
}
