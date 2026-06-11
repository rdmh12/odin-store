import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "./Product.jsx";
import products from "./debug-products.js";

test("renders product information", () => {
  const product = products[0];

  render(<Product product={product} amount={0} />);

	const image = screen.getByRole("img");
	const title = screen.getByRole("heading");
	const price = screen.getByText(product.price);
	const description = screen.getByText(product.description);
	const button = screen.getByRole("button");

	expect(image).toHaveAttribute("src", product.image);
	expect(image).toHaveAttribute("alt", product.title);
	expect(title.textContent).toBe(product.title);
	expect(price).toBeInTheDocument();
	expect(description).toBeInTheDocument();
	expect(button.textContent).toBe("Add to cart");
});

test("add to cart button triggers its associated callback", async () => {
  const product = products[0];
	const user = userEvent.setup();

	const amountIncreasedHandler = vi.fn();

  render(<Product product={product} amount={0} onAmountIncreased={amountIncreasedHandler} />);

	const button = screen.getByRole("button");

	await user.click(button);

	expect(amountIncreasedHandler).toHaveBeenCalled();
});

test("renders increment/decrement buttons when amount is > 0", async () => {
  const product = products[0];

  render(<Product product={product} amount={2} />);

	expect(screen.queryByRole("button", {name: "Increment"})).toBeInTheDocument();
	expect(screen.queryByRole("button", {name: "Decrement"})).toBeInTheDocument();
});

test("increment/decrement buttons trigger their associated callbacks", async () => {
  const product = products[0];
	const user = userEvent.setup();

	const amountIncreasedHandler = vi.fn();
	const amountDecreasedHandler = vi.fn();

  render(<Product product={product} amount={1} onAmountDecreased={amountDecreasedHandler} onAmountIncreased={amountIncreasedHandler} />);

	const decrement = screen.getByRole("button", {name: "Decrement"});
	const increment = screen.getByRole("button", {name: "Increment"});

	await user.click(decrement);
	await user.click(increment);
	await user.click(decrement);

	expect(amountDecreasedHandler).toHaveBeenCalledTimes(2);
	expect(amountIncreasedHandler).toHaveBeenCalledTimes(1);
});
