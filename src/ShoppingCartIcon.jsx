import { Link } from "react-router-dom";

export default function ShoppingCartIcon({amount}) {
	// return <a href="/link">Shopping Cart ({amount})</a>;
	return <Link to="/cart">Shopping Cart ({amount})</Link>;
}
