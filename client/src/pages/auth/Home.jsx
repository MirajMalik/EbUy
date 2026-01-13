import { MOCK_PRODUCTS } from "../products/mockProducts";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../products/cartStorage";

export default function Home() {
  const [msg, setMsg] = useState("");

  function handleAdd(product) {
    addToCart(product);
    setMsg(`Added to cart: ${product.name}`);
    setTimeout(() => setMsg(""), 1200);
  }

  return (
    <div>
      {/* HERO / TOP BAR */}
      <div className="hero">
        <div className="heroRow">
          <div>
            <h1 className="heroTitle">EbUy — Shop Everything</h1>

            <p className="heroText">
              Get a better experience with EbUY.Easy Shooping.
            </p>

            <div className="heroBtns">
              <Link to="/login">
                <button className="btn btnPrimary" type="button">
                  Sign In
                </button>
              </Link>

              <Link to="/register">
                <button className="btn" type="button">
                  Sign Up
                </button>
              </Link>

              <Link to="/login?role=admin">
                <button className="btn" type="button">
                  Admin Login
                </button>
              </Link>
            </div>

            {msg && <p style={{ color: "green", marginTop: 10 }}>{msg}</p>}
          </div>

          {/* Right side promo card */}
          <div className="card" style={{ maxWidth: 340 }}>
            <h3 className="cardTitle">Quick Start</h3>
            <p className="cardMuted">
              You can browse now. Later we will connect real login + checkout with backend APIs.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link to="/products">
                <button className="btn" type="button">
                  Open Products Page
                </button>
              </Link>

              <Link to="/cart">
                <button className="btn" type="button">
                  View Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ALL PRODUCTS ON HOME */}
      <h3 className="sectionTitle">All Products</h3>

      <div className="grid grid3">
        {MOCK_PRODUCTS.map((p) => (
          <div key={p.id} className="card">
            <h3 className="cardTitle">{p.name}</h3>
            <p className="cardMuted">{p.description}</p>

            <div className="cardRow">
              <span className="priceTag">৳ {p.price}</span>

              <div style={{ display: "flex", gap: 8 }}>
                <Link to={`/products/${p.id}`}>
                  <button className="btn" type="button">
                    View
                  </button>
                </Link>

                <button className="btn btnPrimary" type="button" onClick={() => handleAdd(p)}>
                  Add
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      <span style={{ marginTop:100}}>
        <Link to={`/products`}>
          <button className="btn-View-All-Products" type="button">
            View All Products
          </button>
        </Link>
      </span>

    </div>
  );
}

