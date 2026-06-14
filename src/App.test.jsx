import { test, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "./routes.jsx";

test("renders home page by default", () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const heading = screen.getByRole("heading");

  expect(heading.textContent).toBe("Welcome to the store!");
});

test("navigation", async () => {
  const router = createMemoryRouter(routes);
  const user = userEvent.setup();

  render(<RouterProvider router={router} />);

  const home = screen.getByRole("link", { name: "Home" });
  // const products = screen.getByRole("link", { name: "Products" });
  const cart = screen.getByRole("link", { name: "0 items in cart" });

  // await user.click(products);
  // expect(screen.queryAllByRole("heading").length).toBe(20);

  await user.click(cart);
  expect(screen.queryByRole("heading").textContent).toBe("Your cart is empty.");

  await user.click(home);
  expect(screen.queryByRole("heading").textContent).toBe(
    "Welcome to the store!",
  );
});
