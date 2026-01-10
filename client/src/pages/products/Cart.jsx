import "../../styles/cart.css";
import { useState } from "react";
import { clearCart, getCart, removeFromCart, setQty } from "../products/cartStorage";
import { Link } from "react-router-dom";

export default function Cart() {

  const [items, setItems] = useState(() => getCart());

  // Total = sum(price * qty)
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleRemove(id) {
    const updated = removeFromCart(id); // updates localStorage
    setItems(updated); // updates UI
  }

  function handleQty(id, newQty) {
    const updated = setQty(id, newQty); // ensures qty >= 1
    setItems(updated);
  }

  function handleClear() {
    const updated = clearCart(); // empty cart in localStorage
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
                {/* Product column */}
                <div>
                  <div className="cartName">{item.name}</div>
                  <div className="cartMuted">ID: {item.id}</div>
                </div>

                {/* Price column */}
                <div>৳ {item.price}</div>

                {/* Quantity column */}
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

                {/* Subtotal column */}
                <div>৳ {item.price * item.qty}</div>

                {/* Remove button */}
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

            <button
              className="btn btnPrimary"
              type="button"
              style={{ width: "100%", marginTop: 12 }}
              onClick={() => alert("Checkout will be added later (backend needed).")}
            >
              Checkout
            </button>

            <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 10 }}>
              Checkout is a placeholder. Later we will connect payment + order API.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
