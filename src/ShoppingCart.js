export default class ShoppingCart {
  #items;

  constructor(cart) {
    if (cart !== undefined && cart.#items != undefined) {
      this.#items = new Map(cart.#items);
    } else {
      this.#items = new Map();
    }
  }

  get size() {
		return this.#items.values().reduce((accum, {amount}) => accum + amount, 0);
  }

  decreaseAmount(product) {
    const item = this.#items.get(product.id);

    if (item.amount == 1) {
      this.#items.delete(product.id);
    } else {
      this.#items.set(product.id, { product, amount: item.amount - 1 });
    }
  }

  increaseAmount(product) {
    const item = this.#items.get(product.id);
    const amount = item ? item.amount + 1 : 1;

    this.#items.set(product.id, { product, amount });
  }

  getAmount(productId) {
    const item = this.#items.get(productId);
    return item ? item.amount : 0;
  }

  getTotalPrice() {
    return this.#items
      .values()
      .reduce(
        (accum, { product, amount }) => accum + product.price * amount,
        0,
      );
  }

  map(callback) {
    const result = new Array(this.#items.size);
    let index = 0;

    for (const { product, amount } of this.#items.values()) {
      result[index] = callback(product, amount, index++);
    }

    return result;
  }

  remove(productId) {
    this.#items.delete(productId);
  }
}
