import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

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
              <Link to="/cart">Shopping Cart</Link>
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
