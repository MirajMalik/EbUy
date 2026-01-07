import { Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "../pages/products/mockProducts";
import "../styles/home.css";


export default function Home() {

  const featured = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="heroRow">
          <div>
            <h1 className="heroTitle">Welcome to EbUy</h1>

            <p className="heroText">
              A beginner-friendly e-commerce website built with React + Node.js.
              Browse products, add to cart, and experience a real shop UI.
            </p>

            <div className="heroBtns">
              <Link to="/products">
                <button className="btn btnPrimary" type="button">
                  Shop Now
                </button>
              </Link>

              <Link to="/cart">
                <button className="btn" type="button">
                  View Cart
                </button>
              </Link>
            </div>
          </div>

          {/* This right side is  a simple box for promo */}
          <div className="card" style={{ maxWidth: 320 }}>
            <h3 className="cardTitle">Today’s Deal</h3>
            <p className="cardMuted">Get best price on accessories.</p>
            <Link to="/products">
              <button className="btn" type="button">
                Explore Deals
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* TRUST BADGES */}
      <h3 className="sectionTitle">Why shop with EbUy?</h3>
      <div className="badges">
        <div className="badgeCard">
          <h4 className="badgeTitle">Fast Delivery</h4>
          <p className="badgeDesc">Quick delivery support for major cities.</p>
        </div>

        <div className="badgeCard">
          <h4 className="badgeTitle">Secure Payment</h4>
          <p className="badgeDesc">Payment system will be added later (planned).</p>
        </div>

        <div className="badgeCard">
          <h4 className="badgeTitle">Easy Returns</h4>
          <p className="badgeDesc">Simple return policy will be available soon.</p>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <h3 className="sectionTitle">Featured Products</h3>

      <div className="grid grid3">
        {featured.map((p) => (
          <div key={p.id} className="card">
            <h3 className="cardTitle">{p.name}</h3>
            <p className="cardMuted">{p.description}</p>

            <div className="cardRow">
              <span className="priceTag">৳ {p.price}</span>

              <Link to={`/products/${p.id}`}>
                <button className="btn" type="button">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="hero" style={{ marginTop: 18 }}>
        <h3 style={{ marginTop: 0 }}>Ready to build full e-commerce?</h3>
        <p style={{ color: "var(--muted)", marginTop: 6 }}>
          loading
        </p>

        <Link to="/products">
          <button className="btn btnPrimary" type="button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
