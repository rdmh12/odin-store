import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub, Outlet } from "react-router-dom";
import { useState } from "react";
import Cart from "./Cart.jsx";
import products from "./debug-products.js";
import ShoppingCart from "./ShoppingCart.js";

test("renders no items when cart is empty", () => {
  const Stub = createStub(new ShoppingCart());

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

  const Stub = createStub(cart);

  render(<Stub />);

  const entries = screen.getAllByTestId("cart-entry");

  expect(entries.length).toBe(3);

  // using `map` here because `forEach` is not implement for ShoppingCart
  cart.map((product, amount, index) => {
    const entry = entries[index];

    expect(within(entry).getByRole("heading").textContent).toBe(product.title);
    expect(
      within(entry).queryByRole("button", { name: "Decrement" }),
    ).toBeInTheDocument();
    expect(
      within(entry).queryByRole("button", { name: "Increment" }),
    ).toBeInTheDocument();
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

  const Stub = createStub(cart);

  render(<Stub />);

  expect(screen.getByTestId("cart-total").textContent).toBe(
    `Total price: ${cart.getTotalPrice().toFixed(2)}`,
  );
});

test("increment/decrement buttons update amount items in cart", async () => {
  const cart = new ShoppingCart();
  cart.increaseAmount(products[0]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[6]);

  const user = userEvent.setup();

  const Stub = createStub(cart);

  render(<Stub />);

  const amount = screen.getAllByTestId("cart-entry-amount");
  const decrement = screen.getAllByRole("button", { name: "Decrement" });
  const increment = screen.getAllByRole("button", { name: "Increment" });
  const price = screen.getAllByTestId("cart-entry-price");

  expect(amount[0].textContent).toBe("1");
  await user.click(increment[0]);
  expect(amount[0].textContent).toBe("2");
  expect(price[0].textContent).toBe((products[0].price * 2).toFixed(2));

  await user.click(decrement[1]);
  expect(amount[1].textContent).toBe("1");
  expect(price[1].textContent).toBe((products[3].price * 1).toFixed(2));

  await user.click(decrement[1]);
  expect(
    screen.queryByRole("heading", { name: products[1].title }),
  ).not.toBeInTheDocument();
  expect(amount[1]).not.toBeInTheDocument();
  expect(decrement[1]).not.toBeInTheDocument();
  expect(increment[1]).not.toBeInTheDocument();

  await user.click(decrement[0]);
  await user.click(decrement[0]);
  await user.click(decrement[2]);
  expect(screen.getByRole("heading").textContent).toBe("Your cart is empty.");
});

test("increment/decrement buttons update total price", async () => {
  // TODO: implement
});

function TestOutlet({ initialCart }) {
  const [cart, setCart] = useState(initialCart);

  return <Outlet context={[cart, setCart]} />;
}

function createStub(initialCart) {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <TestOutlet initialCart={initialCart} />,
      children: [
        {
          index: true,
          Component: Cart,
        },
      ],
    },
  ]);

  return Stub;
}
