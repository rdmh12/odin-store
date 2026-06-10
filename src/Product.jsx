import styles from "./Product.module.css";

export default function Product({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <div>{product.price}</div>
      <div>{product.description}</div>
    </div>
  );
}
