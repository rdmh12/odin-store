import { test, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "./routes.jsx";

test("renders home page by default", () => {
  const router = createMemoryRouter(routes);

  render(<RouterProvider router={router} />);

  const heading = screen.getByRole("heading");

  expect(heading.textContent).toBe("Home");
});

test("navigation", async () => {
  const router = createMemoryRouter(routes);
  const user = userEvent.setup();

  render(<RouterProvider router={router} />);

  const navigation = screen.getByRole("navigation");
  const home = within(navigation).getByText("Home");
  const products = within(navigation).getByText("Products");
  const cart = within(navigation).getByText("Shopping Cart (0)");

  await user.click(products);
  expect(screen.getByText("Shop")).toBeInTheDocument();

  await user.click(cart);
  expect(screen.getByRole("heading").textContent).toBe("Cart");

  await user.click(home);
  expect(screen.getByRole("heading").textContent).toBe("Home");
});
