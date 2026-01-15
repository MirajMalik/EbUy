import "../../styles/cart.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clearCart, getCart, removeFromCart, setQty } from "../products/cartStorage";

export default function Cart() {
  const [items, setItems] = useState(() => getCart());

  // ✅ login check (only once)
  const token = localStorage.getItem("ebuy_token");
  const isLoggedIn = Boolean(token);

  // ✅ so we can redirect back to /cart after login 
  const location = useLocation();

  // Total = sum(price * qty)
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleRemove(id) {
    const updated = removeFromCart(id);
    setItems(updated);
  }

  function handleQty(id, newQty) {
    const updated = setQty(id, newQty);
    setItems(updated);
  }

  function handleClear() {
    const updated = clearCart();
    setItems(updated);
  }

  return (
    <div>
      <h2>Cart</h2>

      {items.length === 0 ? (
        <div className="card">
          <p style={{ marginTop: 0 }}>Your cart is empty.</p>
          <Link to="/products">
            <button className="btn btnPrimary" type="button">
              Go Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="cartWrap">
          {/* LEFT: Cart Items */}
          <div className="cartList">
            <div className="cartRow" style={{ fontWeight: 800 }}>
              <div>Product</div>
              <div>Price</div>
              <div>Qty</div>
              <div>Subtotal</div>
              <div />
            </div>

            {items.map((item) => (
              <div key={item.id} className="cartRow">
                <div>
                  <div className="cartName">{item.name}</div>
                  <div className="cartMuted">ID: {item.id}</div>
                </div>

                <div>৳ {item.price}</div>

                <div className="qtyBox">
                  <button
                    className="qtyBtn"
                    type="button"
                    onClick={() => handleQty(item.id, item.qty - 1)}
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    className="qtyBtn"
                    type="button"
                    onClick={() => handleQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>

                <div>৳ {item.price * item.qty}</div>

                <button className="btn" type="button" onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/products">
                <button className="btn" type="button">
                  Continue Shopping
                </button>
              </Link>

              <button className="btn" type="button" onClick={handleClear}>
                Clear Cart
              </button>
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="summary">
            <h3 className="summaryTitle">Order Summary</h3>

            <div className="summaryRow">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="summaryRow">
              <span>Delivery</span>
              <span>৳ 0</span>
            </div>

            <div className="summaryRow">
              <span>Discount</span>
              <span>৳ 0</span>
            </div>

            <div className="hr" />

            <div className="summaryTotal">
              <span>Total</span>
              <span>৳ {total}</span>
            </div>

            {/* ✅ Checkout control */}
            {isLoggedIn ? (
              <>
                <button
                  className="btn btnPrimary"
                  type="button"
                  style={{ width: "100%", marginTop: 12 }}
                  onClick={() => alert("✅ Order placed (placeholder).")}
                >
                  Place Order
                </button>

                <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 10 }}>
                  Later we will connect payment + order API.
                </p>
              </>
            ) : (
              <>
                <Link to="/login" state={{ from: location.pathname }}>
                  <button
                    className="btn btnPrimary"
                    type="button"
                    style={{ width: "100%", marginTop: 12 }}
                  >
                    Sign in to Purchase
                  </button>
                </Link>

                <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                  <Link to="/login" state={{ from: location.pathname }}>
                    <button className="btn" type="button">
                      Sign In
                    </button>
                  </Link>

                  <Link to="/register">
                    <button className="btn" type="button">
                      Sign Up
                    </button>
                  </Link>
                </div>

                <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 10 }}>
                  You can build your cart, but checkout requires login.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
