import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { getCart } from "../pages/products/cartStorage";

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}

export default function Header() {
  const [cartCount, setCartCount] = useState(() => getCartCount());

  // When cart changes, update the badge
  useEffect(() => {
    function onCartUpdated() {
      setCartCount(getCartCount());
    }

    window.addEventListener("cart:updated", onCartUpdated);

    return () => window.removeEventListener("cart:updated", onCartUpdated);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="headerRow">
          {/* Logo */}
          <Link className="logo" to="/">
            EbUy
          </Link>

          {/* Navigation */}
          <nav className="nav">
            <NavLink to="/" end>
              Home
            </NavLink>

            <NavLink to="/products">Products</NavLink>

            <NavLink to="/cart">
              Cart <span className="badge">{cartCount}</span>
            </NavLink>
            <NavLink to="/register">Create Account</NavLink>

            <NavLink to="/login"><b>Admin</b></NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
