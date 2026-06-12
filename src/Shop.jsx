import { useLoaderData, useOutletContext } from "react-router-dom";
import Product from "./Product.jsx";
import styles from "./Shop.module.css";

export default function Shop() {
  const { products } = useLoaderData();
  const [cart, setCart] = useOutletContext();

  const amountDecreasedHandler = (productId) => {
    if (cart.has(productId)) {
      const newCart = new Map(cart);
      const amount = newCart.get(productId);

      if (amount == 1) {
        newCart.delete(productId);
      } else {
        newCart.set(productId, amount - 1);
      }

      setCart(newCart);
    }
  };

  const amountIncreasedHandler = (productId) => {
    const newCart = new Map(cart);
    const amount = newCart.get(productId) ?? 0;
    newCart.set(productId, amount + 1);
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
              amount={cart.get(product.id) ?? 0}
              onAmountDecreased={() => {
                amountDecreasedHandler(product.id);
              }}
              onAmountIncreased={() => {
                amountIncreasedHandler(product.id);
              }}
            />
          ))}
      </div>
    </>
  );
}
