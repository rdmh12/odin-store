import styles from "./Product.module.css";

export default function Product({ product, amount, onAmountDecreased, onAmountIncreased }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <div>{product.price}</div>
      <div>{product.description}</div>
      {amount ? (
        <div className={styles.buttons}>
          <button type="button" onClick={onAmountDecreased}>Decrement</button>
          <div>{amount}</div>
          <button type="button" onClick={onAmountIncreased}>Increment</button>
        </div>
      ) : (
        <button type="button" onClick={onAmountIncreased}>Add to cart</button>
      )}
    </div>
  );
}
