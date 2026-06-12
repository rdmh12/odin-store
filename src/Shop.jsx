import { useLoaderData, useOutletContext } from "react-router-dom";
import Product from "./Product.jsx";
import styles from "./Shop.module.css";

export default function Shop() {
  const { products } = useLoaderData();
  const [cart, setCart] = useOutletContext();

  const amountDecreasedHandler = (product) => {
    if (cart.has(product.id)) {
      const newCart = new Map(cart);
      const entry = newCart.get(product.id);

      if (entry.amount == 1) {
        newCart.delete(product.id);
      } else {
        newCart.set(product.id, { ...entry, amount: entry.amount - 1 });
      }

      setCart(newCart);
    }
  };

  const amountIncreasedHandler = (product) => {
    const newCart = new Map(cart);

    const entry = newCart.get(product.id);

    if (entry) {
      newCart.set(product.id, { ...entry, amount: entry.amount + 1 });
    } else {
      newCart.set(product.id, { product, amount: 1 });
    }

    setCart(newCart);
  };

  return (
    <>
      <h1>Shop</h1>
      <div className={styles.content} data-testid="shop-products">
        {products.length &&
          products.map((product) => {
            const entry = cart.get(product.id);
            const amount = entry ? entry.amount : 0;
            return (
              <Product
                key={product.id}
                product={product}
                amount={amount}
                onAmountDecreased={() => {
                  amountDecreasedHandler(product);
                }}
                onAmountIncreased={() => {
                  amountIncreasedHandler(product);
                }}
              />
            );
          })}
      </div>
    </>
  );
}
