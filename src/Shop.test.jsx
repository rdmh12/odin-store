import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createRoutesStub, Outlet } from "react-router-dom";
import { useReducer } from "react";
import Shop from "./Shop.jsx";
import products from "./debug-products.js";
import ShoppingCart from "./ShoppingCart.js";
import shoppingCartReducer from "./shoppingCartReducer.js";

test("renders products", async () => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <TestOutlet />,
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

function TestOutlet() {
  const [cart, dispatch] = useReducer(shoppingCartReducer, new ShoppingCart());

  return <Outlet context={[cart, dispatch]} />;
}
