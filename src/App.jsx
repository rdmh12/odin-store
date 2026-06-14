import { Outlet, Link, NavLink, useNavigation } from "react-router-dom";
import { useState } from "react";
import ShoppingCartIcon from "./ShoppingCartIcon.jsx";
import ShoppingCart from "./ShoppingCart.js";
import progress from "./img/progress.svg";

export default function App() {
  const [cart, setCart] = useState(new ShoppingCart());
  const navigation = useNavigation();

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
            <li className="stretch" role="none"></li>
            <li>
              <ShoppingCartIcon amount={cart.size} />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {navigation.state === "loading" ? (
          <div className="content center">
            <img src={progress} alt="Loading" className="spinner" />
          </div>
        ) : (
          <Outlet context={[cart, setCart]} />
        )}
      </main>
    </>
  );
}
