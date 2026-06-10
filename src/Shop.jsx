import { useLoaderData } from "react-router-dom";
import Product from "./Product.jsx";
import styles from "./Shop.module.css";

export default function Shop() {
  const { products } = useLoaderData();

  return (
    <>
      <h1>Shop</h1>
      <div className={styles.content} data-testid="shop-products">
        {products.length && products.map((product) =>
          <Product key={product.id} product={product} />
        )}
      </div>
    </>
  );
}
