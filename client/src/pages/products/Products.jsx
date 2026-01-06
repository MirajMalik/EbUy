import { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../products/cartStorage";
import { MOCK_PRODUCTS } from "../products/mockProducts";

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

      <p style={{ fontSize: 13, color: "var(--muted)" }}>
        Browse products and add them to your cart.
      </p>

      {msg && <p style={{ color: "green" }}>{msg}</p>}

      <div className="grid grid3">
        {MOCK_PRODUCTS.map((p) => (
          <div key={p.id} className="card">
            <h3 className="cardTitle">{p.name}</h3>

            <p className="cardMuted">{p.description}</p>

            <div className="cardRow">
              <span className="priceTag">$ {p.price}</span>

              <div style={{ display: "flex", gap: 8 }}>
                <Link to={`/products/${p.id}`}>
                  <button className="btn" type="button">
                    View
                  </button>
                </Link>

                <button
                  className="btn btnPrimary"
                  type="button"
                  onClick={() => handleAdd(p)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
