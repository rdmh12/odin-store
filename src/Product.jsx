import styles from "./Product.module.css";

export default function Product({
  product,
  amount,
  onAmountDecreased,
  onAmountIncreased,
}) {
  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.title} />
      <div className="stretcher"></div>
      <div className={styles.rating} data-testid="product-rating">
        <span>{product.rating.rate}</span>
        <span className={styles.ratingCount}>({product.rating.count})</span>
      </div>
      <h2>{product.title}</h2>
      <div className={styles.price}>{product.price.toFixed(2)}</div>
      {amount ? (
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={onAmountDecreased}
            aria-label="Decrement"
            className={`${styles.amountButton} ${styles.amountButtonDecrement}`}
          >
            {amount == 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#555"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#555"
              >
                <path d="M200-440v-80h560v80H200Z" />
              </svg>
            )}
          </button>
          <div className={styles.amount}>{amount}</div>
          <button
            type="button"
            onClick={onAmountIncreased}
            aria-label="Increment"
            className={`${styles.amountButton} ${styles.amountButtonIncrement}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#555"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onAmountIncreased}
          className={styles.addButton}
        >
          Add to cart
        </button>
      )}
    </div>
  );
}
