import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../products/cartStorage";
import { getProducts } from "../../api"; 

export default function Products() {
  const [msg, setMsg] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const data = await getProducts();
        const list = data?.payload?.products || [];

        if (alive) setProducts(list);
      } catch (e) {
        const m = e?.response?.data?.message || e.message || "Failed to load products";
        if (alive) setErr(m);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  function handleAdd(product) {
    const cartItem = {
      id: product._id, // Mongo id
      name: product.name,
      price: product.price,
      description: product.description || "",
    };

    addToCart(cartItem);
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
      {loading && <p>Loading products...</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      {!loading && !err && (
        <div className="grid grid3">
          {products.map((p) => (
            <div key={p._id} className="card">
              <h3 className="cardTitle">{p.name}</h3>

              <p className="cardMuted">{p.description}</p>

              <div className="cardRow">
                <span className="priceTag">$ {p.price}</span>

                <div style={{ display: "flex", gap: 8 }}>
                  <Link to={`/products/${p._id}`}>
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

          {products.length === 0 && (
            <div className="card">
              <p>No products found in database.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
