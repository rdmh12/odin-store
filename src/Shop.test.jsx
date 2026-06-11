import { test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createRoutesStub, Outlet } from "react-router-dom";
import Shop from "./Shop.jsx";
import products from "./debug-products.js";

test("renders products", async () => {
  let cart = new Map();
	const setCart = (newCart) => { cart = newCart};

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <Outlet context={[cart, setCart]} />,
      children: [
        {
          index: true,
          Component: Shop,
          loader: async () => {
            return { products };
          },
        },
      ],
    },
  ]);

  render(<Stub initialEntries={["/"]} />);

  const content = await waitFor(() => screen.getByTestId("shop-products"));

  expect(content.children.length).toBe(products.length);
});
