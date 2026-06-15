import { useOutletContext, useNavigate } from "react-router-dom";
import AmountButtons from "./AmountButtons.jsx";
import styles from "./Cart.module.css";

export default function Cart() {
  const [cart, dispatch] = useOutletContext();
  const navigate = useNavigate();
  let content;
  let checkout;

  if (cart.size == 0) {
    content = <h2 className={styles.emptyMessage}>Your cart is empty.</h2>;
    checkout = "";
  } else {
    content = (
      <div className={styles.entries}>
        {cart.map((product, amount) => (
          <div
            key={product.id}
            data-testid="cart-entry"
            className={styles.entry}
          >
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <div className={styles.details}>
              <div className={styles.entryHeader}>
                <h2>{product.title}</h2>
                <div data-testid="cart-entry-price" className={styles.price}>
                  {(product.price * amount).toFixed(2)}
                </div>
              </div>
              <div className={styles.entryButtons}>
                <AmountButtons
                  amount={amount}
                  onAmountIncreased={() =>
                    dispatch({ type: "increment", product })
                  }
                  onAmountDecreased={() =>
                    dispatch({ type: "decrement", product })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "remove", productId: product.id })
                  }
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

    checkout = (
      <div className={`content ${styles.checkout}`}>
        <div data-testid="cart-total" className={styles.totalPrice}>
          Total price:{" "}
          <span className={styles.price}>
            {cart.getTotalPrice().toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "empty" });
            navigate("/checkout", {
              state: { message: "Checkout completed!" },
            });
          }}
          className={styles.checkoutButton}
        >
          Checkout
        </button>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      {checkout}
      <div className="content stretch">
        <h1 className={styles.title}>Shopping Cart</h1>
        {content}
      </div>
    </div>
  );
}
