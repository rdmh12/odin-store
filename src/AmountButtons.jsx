import styles from "./AmountButtons.module.css";
import trash from "./img/trash.svg";
import minus from "./img/minus.svg";
import plus from "./img/plus.svg";

export default function AmountButtons({
  amount,
  onAmountDecreased,
  onAmountIncreased,
}) {
  return (
    <div className={styles.buttons}>
      <button
        type="button"
        onClick={onAmountDecreased}
        aria-label="Decrement"
        className={`${styles.amountButton} ${styles.amountButtonDecrement}`}
      >
        <img src={amount == 1 ? trash : minus} className={styles.buttonIcon} />
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
  );
}
