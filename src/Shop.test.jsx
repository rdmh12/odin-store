import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createRoutesStub } from "react-router-dom";
import Shop from "./Shop.jsx";
import products from "./debug-products.js";

test("renders products", async () => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: Shop,
      loader: async () => { return { products }; },
    },
  ]);

  render(<Stub />);

  const content = await waitFor(() => screen.getByTestId("shop-products"));

  expect(content.children.length).toBe(products.length);
});
