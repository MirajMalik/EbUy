import { useMemo,useState } from "react";                // useMemo = compute something efficiently
import { useParams, Link } from "react-router-dom"; // useParams reads :id from URL
import { addToCart } from "../products/cartStorage";     // add product to cart
import { MOCK_PRODUCTS } from "../products/mockProducts"; // product list

export default function ProductDetails() {
  const { id } = useParams();

  const [msg, setMsg] = useState("");

  // Find product based on id from URL
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }, [id]);

  function handleAdd() {
    if (!product) return;

    // Add item to cart storage
    addToCart(product);

    setMsg(`Added to cart: ${product.name}`);
    setTimeout(() => setMsg(""), 1200);
  }

  return (
    <div>
      <p style={{ marginTop: 0 }}>
        <Link to="/products">← Back to Products</Link>
      </p>

      {!product ? (
        <p style={{ color: "crimson" }}>Product not found.</p>
      ) : (
        <div className="detailsCard">
          <div className="detailsTop">
            <div>
              <h2 className="detailsName">{product.name}</h2>
              <p style={{ color: "var(--muted)", marginTop: 6 }}>
                {product.description}
              </p>
            </div>

            <div className="detailsPrice">৳ {product.price}</div>
          </div>

          {msg && <p style={{ color: "green", marginTop: 10 }}>{msg}</p>}

          <div className="detailsActions">
            <Link to="/products">
              <button className="btn" type="button">
                Back
              </button>
            </Link>

            <button className="btn btnPrimary" type="button" onClick={handleAdd}>
              Add to cart
            </button>

            <Link to="/cart">
              <button className="btn" type="button">
                Go to Cart
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
