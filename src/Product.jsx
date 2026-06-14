import styles from "./Product.module.css";
import starFull from "./img/star.svg";
import starHalf from "./img/star-half.svg";
import starEmpty from "./img/star-empty.svg";

export default function Product({
  product,
  amount,
  onAmountDecreased,
  onAmountIncreased,
}) {
  const stars = new Array(5);
  const fullStars = Math.trunc(product.rating.rate);
  const halfStar = product.rating.rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  let index = 0;

  for (let count = 0; count < fullStars; count++) {
    stars[index++] = <img src={starFull} alt="" className={styles.star} />;
  }

  if (halfStar) {
    stars[index++] = <img src={starHalf} alt="" className={styles.star} />;
  }

  for (let count = 0; count < emptyStars; count++) {
    stars[index++] = <img src={starEmpty} alt="" className={styles.star} />;
  }

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.title} />
      <div className="stretcher"></div>
      <div className={styles.rating}>
        <span aria-hidden="true" data-testid="product-rating">{product.rating.rate}</span>
        <span aria-label={`${product.rating.rate} of out 5 stars, rating`}>
          {stars}
        </span>
        <span className={styles.ratingCount} aria-hidden="true" data-testid="product-rating-count">
          ({product.rating.count})
        </span>
        <span className="sr-only">{`${product.rating.count} ratings`}</span>
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
