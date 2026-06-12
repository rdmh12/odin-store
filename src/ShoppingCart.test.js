import { test, expect } from "vitest";
import ShoppingCart from "./ShoppingCart.js";
import products from "./debug-products.js";

test("new cart without supplying items has size 0", () => {
  const cart = new ShoppingCart();

  expect(cart.size).toBe(0);
});

test("new cart constructed from another cart has correct size", () => {
  const cart = new ShoppingCart();
  cart.increaseAmount(products[0]);
  cart.increaseAmount(products[5]);
  cart.increaseAmount(products[10]);

  const newCart = new ShoppingCart(cart);

  expect(newCart.size).toBe(3);
});

test("increases/decreases item amount", () => {
  const cart = new ShoppingCart();
  expect(cart.size).toBe(0);
  expect(cart.getAmount(products[0].id)).toBe(0);
  expect(cart.getAmount(products[1].id)).toBe(0);
  expect(cart.getAmount(products[2].id)).toBe(0);

  cart.increaseAmount(products[0]);
  expect(cart.size).toBe(1);
  expect(cart.getAmount(products[0].id)).toBe(1);
  expect(cart.getAmount(products[1].id)).toBe(0);
  expect(cart.getAmount(products[2].id)).toBe(0);

  cart.increaseAmount(products[0]);
  expect(cart.size).toBe(1);
  expect(cart.getAmount(products[0].id)).toBe(2);
  expect(cart.getAmount(products[1].id)).toBe(0);
  expect(cart.getAmount(products[2].id)).toBe(0);

  cart.increaseAmount(products[1]);
  expect(cart.size).toBe(2);
  expect(cart.getAmount(products[0].id)).toBe(2);
  expect(cart.getAmount(products[1].id)).toBe(1);
  expect(cart.getAmount(products[2].id)).toBe(0);

  cart.decreaseAmount(products[0]);
  expect(cart.size).toBe(2);
  expect(cart.getAmount(products[0].id)).toBe(1);
  expect(cart.getAmount(products[1].id)).toBe(1);
  expect(cart.getAmount(products[2].id)).toBe(0);

  cart.increaseAmount(products[0]);
  expect(cart.size).toBe(2);
  expect(cart.getAmount(products[0].id)).toBe(2);
  expect(cart.getAmount(products[1].id)).toBe(1);
  expect(cart.getAmount(products[2].id)).toBe(0);

  cart.decreaseAmount(products[0]);
  expect(cart.size).toBe(2);
  expect(cart.getAmount(products[0].id)).toBe(1);
  expect(cart.getAmount(products[1].id)).toBe(1);
  expect(cart.getAmount(products[2].id)).toBe(0);

  cart.decreaseAmount(products[1]);
  expect(cart.size).toBe(1);
  expect(cart.getAmount(products[0].id)).toBe(1);
  expect(cart.getAmount(products[1].id)).toBe(0);
  expect(cart.getAmount(products[2].id)).toBe(0);

  cart.decreaseAmount(products[0]);
  expect(cart.size).toBe(0);
  expect(cart.getAmount(products[0].id)).toBe(0);
  expect(cart.getAmount(products[1].id)).toBe(0);
  expect(cart.getAmount(products[2].id)).toBe(0);
});

test("calculates correct total price", () => {
  const cart = new ShoppingCart();
  cart.increaseAmount(products[0]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[6]);

  expect(cart.getTotalPrice()).toBe(151.92000000000002);
});

test("map", () => {
  const cart = new ShoppingCart();
  cart.increaseAmount(products[0]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[3]);
  cart.increaseAmount(products[6]);

  const amounts = cart.map((product, amount) => [product.id, amount]);

  expect(amounts).toStrictEqual([
    [products[0].id, 1],
    [products[3].id, 2],
    [products[6].id, 1],
  ]);
});
