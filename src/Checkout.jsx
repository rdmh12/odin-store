import { useLocation } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();

  return (
    location.state?.message && (
      <div className="content">
        <h2>{location.state.message}</h2>
      </div>
    )
  );
}
