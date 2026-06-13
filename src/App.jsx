import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import ShoppingCartIcon from "./ShoppingCartIcon.jsx";
import ShoppingCart from "./ShoppingCart.js";

export default function App() {
  const [cart, setCart] = useState(new ShoppingCart());

  return (
    <>
      <header>
        <Link to="/" className="logo">
          the store
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className="nav-link nav-home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className="nav-link">
                Products
              </NavLink>
            </li>
            <li className="stretcher" role="none"></li>
            <li>
              <ShoppingCartIcon amount={cart.size} />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet context={[cart, setCart]} />
      </main>
    </>
  );
}
