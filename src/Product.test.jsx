import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Product from "./Product.jsx";
import products from "./debug-products.js";

test("renders product information", () => {
  const product = products[0];

  render(<Product product={product} />);

	const image = screen.getByRole("img");
	const title = screen.getByRole("heading");
	const price = screen.getByText(product.price);
	const description = screen.getByText(product.description);

	expect(image).toHaveAttribute("src", product.image);
	expect(image).toHaveAttribute("alt", product.title);
	expect(title.textContent).toBe(product.title);
	expect(price).toBeInTheDocument();
	expect(description).toBeInTheDocument();
});
