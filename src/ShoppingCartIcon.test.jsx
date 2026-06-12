import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShoppingCartIcon from "./ShoppingCartIcon.jsx";

test("renders correctly", () => {
  // const { rerender } = render(<ShoppingCartIcon amount={0} />);
  const { rerender } = render(
    <MemoryRouter>
      <ShoppingCartIcon amount={0} />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link").textContent).toEqual("Shopping Cart (0)");

  rerender(
    <MemoryRouter>
      <ShoppingCartIcon amount={1} />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link").textContent).toEqual("Shopping Cart (1)");

  rerender(
    <MemoryRouter>
      <ShoppingCartIcon amount={123} />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link").textContent).toEqual("Shopping Cart (123)");
});
