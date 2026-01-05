import { useState } from "react";
import { clearCart, getCart, removeFromCart, setQty } from "./cartStorage";

export default function Cart() {
  // This runs ONLY once (on first render) and sets initial cart items.
  // It avoids calling setState inside useEffect.
  const [items, setItems] = useState(() => getCart());

  // Total price = sum of (price * qty) for each item
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleRemove(id) {
    // removeFromCart updates localStorage and returns the updated cart array
    const updated = removeFromCart(id);
    // setItems updates React state so UI updates immediately
    setItems(updated);
  }

  function handleQty(id, newQty) {
    // setQty updates localStorage and returns the updated cart array
    const updated = setQty(id, newQty);
    // update UI state
    setItems(updated);
  }

  function handleClear() {
    // clearCart empties localStorage and returns []
    const updated = clearCart();
    // update UI state
    setItems(updated);
  }

  return (
    <div>
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: "grid", gap: 10, maxWidth: 600 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontWeight: 600 }}>{item.name}</div>

                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  Price: ৳ {item.price}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 8,
                    alignItems: "center",
                  }}
                >
                  {/* Decrease qty */}
                  <button onClick={() => handleQty(item.id, item.qty - 1)}>-</button>

                  <span>Qty: {item.qty}</span>

                  {/* Increase qty */}
                  <button onClick={() => handleQty(item.id, item.qty + 1)}>+</button>

                  {/* Remove item */}
                  <button
                    style={{ marginLeft: "auto" }}
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 14 }}>Total: ৳ {total}</h3>

          <button onClick={handleClear}>Clear cart</button>
        </>
      )}
    </div>
  );
}
