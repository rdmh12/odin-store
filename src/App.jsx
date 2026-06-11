import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import ShoppingCartIcon from "./ShoppingCartIcon.jsx";

export default function App() {
  const [cart, setCart] = useState(new Map());

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Products</Link>
            </li>
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
