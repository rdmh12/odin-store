import { useLocation } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();

  return location.state?.message && <h2>{location.state.message}</h2>;
}
