import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { createRoutesStub, Outlet } from "react-router-dom";
import Cart from "./Cart.jsx";
import products from "./debug-products.js";
import ShoppingCart from "./ShoppingCart.js";

test("renders no items when cart is empty", () => {
  // let cart = new Map();
  // const setCart = (newCart) => {
  //   cart = newCart;
  // };

  const cart = new ShoppingCart();
  const { Stub } = createStub(cart);

  render(<Stub />);

  const empty = screen.queryByRole("heading", { name: "Your cart is empty." });

  expect(empty).toBeInTheDocument();
});

test("renders list of items in cart", () => {
  const cart = new ShoppingCart();
  cart.increaseAmount(products[0]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[6]);

  // eslint-disable-next-line no-unused-vars
  const { Stub, context } = createStub(cart);

  render(<Stub />);

  const entries = screen.getAllByTestId("cart-entry");

  expect(entries.length).toBe(3);

  // using `map` here because `forEach` is not implement for ShoppingCart
  cart.map((product, amount, index) => {
    const entry = entries[index];

    expect(within(entry).getByRole("heading").textContent).toBe(product.title);
    expect(within(entry).getByTestId("cart-entry-amount").textContent).toBe(
      String(amount),
    );
    expect(within(entry).getByTestId("cart-entry-price").textContent).toBe(
      String(product.price * amount),
    );
  });
});

test("renders correct total price of items in cart", () => {
  const cart = new ShoppingCart();
  cart.increaseAmount(products[0]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[6]);

  // eslint-disable-next-line no-unused-vars
  const { Stub, context } = createStub(cart);

  render(<Stub />);

  expect(screen.getByTestId("cart-total").textContent).toBe(
    `Total price: ${cart.getTotalPrice().toFixed(2)}`,
  );
});

function createStub(cart) {
  const context = {};
  context.value = cart;
  context.setValue = (newValue) => {
    context.value = newValue;
  };

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <Outlet context={[context.value, context.setValue]} />,
      children: [
        {
          index: true,
          Component: Cart,
        },
      ],
    },
  ]);

  return { Stub, context };
}
