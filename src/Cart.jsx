import { useOutletContext, useNavigate } from "react-router-dom";
import ShoppingCart from "./ShoppingCart.js";

export default function Cart() {
  const [cart, setCart] = useOutletContext();
  const navigate = useNavigate();

  if (cart.size == 0) return <h2>Your cart is empty.</h2>;

  const decrementHandler = (product) => {
    const newCart = new ShoppingCart(cart);
    newCart.decreaseAmount(product);
    setCart(newCart);
  };

  const incrementHandler = (product) => {
    const newCart = new ShoppingCart(cart);
    newCart.increaseAmount(product);
    setCart(newCart);
  };

  const removeHandler = (productId) => {
    const newCart = new ShoppingCart(cart);
    newCart.remove(productId);
    setCart(newCart);
  };

  const checkoutHandler = () => {
    setCart(new ShoppingCart());
    navigate("/checkout", { state: { message: "Checkout completed!" } });
  };

  return (
    <>
      <div data-testid="cart-total">
        Total price: {cart.getTotalPrice().toFixed(2)}
      </div>
      <button type="button" onClick={checkoutHandler}>
        Checkout
      </button>
      {cart.map((product, amount) => (
        <div key={product.id} data-testid="cart-entry">
          <h2>{product.title}</h2>
          <div>
            <button type="button" onClick={() => decrementHandler(product)}>
              Decrement
            </button>
            <span data-testid="cart-entry-amount">{amount}</span>
            <button type="button" onClick={() => incrementHandler(product)}>
              Increment
            </button>
            <button type="button" onClick={() => removeHandler(product.id)}>
              Remove
            </button>
          </div>
          <div data-testid="cart-entry-price">
            {(product.price * amount).toFixed(2)}
          </div>
        </div>
      ))}
    </>
  );
}
