import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { createRoutesStub, Outlet } from "react-router-dom";
import Cart from "./Cart.jsx";
import products from "./debug-products.js";

test("renders no items when cart is empty", () => {
  let cart = new Map();
  const setCart = (newCart) => {
    cart = newCart;
  };

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <Outlet context={[cart, setCart]} />,
      children: [
        {
          index: true,
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={["/"]} />);

  const empty = screen.queryByRole("heading", { name: "Your cart is empty." });

  expect(empty).toBeInTheDocument();
});

test("renders items in cart", () => {
  let cart = new Map();
  cart.set(products[0].id, { product: products[0], amount: 1 });
  cart.set(products[3].id, { product: products[3], amount: 2 });
  cart.set(products[6].id, { product: products[6], amount: 1 });

  const setCart = (newCart) => {
    cart = newCart;
  };

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <Outlet context={[cart, setCart]} />,
      children: [
        {
          index: true,
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={["/"]} />);

  const entries = screen.getAllByTestId("cart-entry");

  expect(entries.length).toBe(3);

  let index = 0;

  for (const { product, amount } of cart.values()) {
    const entry = entries[index++];
    const price = product.price * amount;

    expect(within(entry).getByRole("heading").textContent).toBe(product.title);
    expect(within(entry).getByTestId("cart-entry-amount").textContent).toBe(
      String(amount),
    );
    expect(within(entry).getByTestId("cart-entry-price").textContent).toBe(
      String(price),
    );
  }

  const totalPrice = cart
    .values()
    .reduce((accum, { product, amount }) => accum + product.price * amount, 0);
  const totalPriceFormatted = totalPrice.toFixed(2);

  expect(screen.getByTestId("cart-total").textContent).toBe(
    `Total price: ${totalPriceFormatted}`,
  );
});
