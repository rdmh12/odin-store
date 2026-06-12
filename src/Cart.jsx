import { useOutletContext } from "react-router-dom";

export default function Cart() {
  const [cart] = useOutletContext();

  if (cart.size == 0) return <h2>Your cart is empty.</h2>;

  const totalPrice = cart
    .values()
    .reduce((accum, { product, amount }) => accum + product.price * amount, 0)
    .toFixed(2);

  return (
    <>
      <div data-testid="cart-total">Total price: {totalPrice}</div>
      {[...cart.values()].map(({ product, amount }) => (
        <div key={product.id} data-testid="cart-entry">
          <h2>{product.title}</h2>
          <div data-testid="cart-entry-amount">{amount}</div>
          <div data-testid="cart-entry-price">{product.price * amount}</div>
        </div>
      ))}
    </>
  );
}
