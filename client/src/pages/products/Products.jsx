import { useState } from "react";              // React hook to store UI message
import { Link } from "react-router-dom";       // Link helps navigation without reloading
import { addToCart } from "./cartStorage";    // function to save item into localStorage cart
import { MOCK_PRODUCTS } from "./mockProducts"; // our mock product list

export default function Products() {
  const [msg, setMsg] = useState(""); 

  function handleAdd(product) {
    addToCart(product); // save the product into cart storage
    setMsg(`Added: ${product.name}`); // show success message
    setTimeout(() => setMsg(""), 1200); // hide message after 1.2 seconds
  }

  return (
    <div>
      <h2>Products</h2>

      <p style={{ fontSize: 13, opacity: 0.8 }}>
        Mock products for now. Later: we will replace this with API (GET /api/products).
      </p>

      {msg && <p style={{ color: "green" }}>{msg}</p>}

      <div style={{ display: "grid", gap: 12, maxWidth: 650 }}>
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
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>$ {p.price}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{p.description}</div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <Link to={`/products/${p.id}`}>
                <button type="button">View Details</button>
              </Link>

              <button type="button" onClick={() => handleAdd(p)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
