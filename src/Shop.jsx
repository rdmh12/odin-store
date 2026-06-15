import { useLoaderData, useOutletContext } from "react-router-dom";
import Product from "./Product.jsx";
import styles from "./Shop.module.css";

export default function Shop() {
  const { products } = useLoaderData();
  const [cart, dispatch] = useOutletContext();

  return (
    <>
      <div className={styles.content} data-testid="shop-products">
        {products.length &&
          products.map((product) => (
            <Product
              key={product.id}
              product={product}
              amount={cart.getAmount(product.id)}
              onAmountDecreased={() => dispatch({ type: "decrement", product })}
              onAmountIncreased={() => dispatch({ type: "increment", product })}
            />
          ))}
      </div>
    </>
  );
}
