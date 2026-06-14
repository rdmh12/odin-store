import styles from "./Product.module.css";
import starFull from "./img/star.svg";
import starHalf from "./img/star-half.svg";
import starEmpty from "./img/star-empty.svg";
import trash from "./img/trash.svg";
import minus from "./img/minus.svg";
import plus from "./img/plus.svg";

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
        <span aria-hidden="true" data-testid="product-rating">
          {product.rating.rate}
        </span>
        <span aria-label={`${product.rating.rate} of out 5 stars, rating`}>
          {stars}
        </span>
        <span
          className={styles.ratingCount}
          aria-hidden="true"
          data-testid="product-rating-count"
        >
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
            <img
              src={amount == 1 ? trash : minus}
              className={styles.buttonIcon}
            />
          </button>
          <div className={styles.amount}>{amount}</div>
          <button
            type="button"
            onClick={onAmountIncreased}
            aria-label="Increment"
            className={`${styles.amountButton} ${styles.amountButtonIncrement}`}
          >
            <img src={plus} className={styles.buttonIcon} />
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
