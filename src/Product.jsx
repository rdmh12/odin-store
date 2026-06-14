import styles from "./Product.module.css";
import starFull from "./img/star.svg";
import starHalf from "./img/star-half.svg";
import starEmpty from "./img/star-empty.svg";
import AmountButtons from "./AmountButtons.jsx";

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
    stars[index++] = <img key={index} src={starFull} alt="" className={styles.star} />;
  }

  if (halfStar) {
    stars[index++] = <img key={index} src={starHalf} alt="" className={styles.star} />;
  }

  for (let count = 0; count < emptyStars; count++) {
    stars[index++] = <img key={index} src={starEmpty} alt="" className={styles.star} />;
  }

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
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
      <div className="stretch"></div>
      <div className={styles.price}>{product.price.toFixed(2)}</div>
      {amount ? (
        <AmountButtons
          amount={amount}
          onAmountIncreased={onAmountIncreased}
          onAmountDecreased={onAmountDecreased}
        />
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
