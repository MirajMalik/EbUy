import { useState } from "react";
import { addToCart } from "./cartStorage";

// product list 
const MOCK_PRODUCTS = [
  { id: "p1", name: "Wireless Mouse", price: 499 },
  { id: "p2", name: "Mechanical Keyboard", price: 1999 },
  { id: "p3", name: "USB-C Cable", price: 199 },
  { id: "p4", name: "Laptop Stand", price: 899 },
];

export default function Products() {
  const [msg, setMsg] = useState("");

  function handleAdd(product) {
    addToCart(product);
    setMsg(`Added: ${product.name}`);
    setTimeout(() => setMsg(""), 1200);
  }

  return (
    <div>
      <h2>Products</h2>

      <p style={{ fontSize: 13, opacity: 0.8 }}>
        These are mock products for now. Later we will load products from backend API.
      </p>

      {msg && <p style={{ color: "green" }}>{msg}</p>}

      <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        {MOCK_PRODUCTS.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>৳ {p.price}</div>
            </div>

            <button onClick={() => handleAdd(p)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
