import ShoppingCart from "./ShoppingCart.js";

export default function shoppingCartReducer(cart, action) {
  switch (action.type) {
    case "decrement": {
      const newCart = new ShoppingCart(cart);
      newCart.decreaseAmount(action.product);
      return newCart;
    }
    case "increment": {
      const newCart = new ShoppingCart(cart);
      newCart.increaseAmount(action.product);
      return newCart;
    }
    case "remove": {
      const newCart = new ShoppingCart(cart);
      newCart.remove(action.productId);
      return newCart;
    }
    case "empty": {
      return new ShoppingCart();
    }
  }
}
