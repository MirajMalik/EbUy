import { useMemo } from "react";                // useMemo = compute something efficiently
import { useParams, Link } from "react-router-dom"; // useParams reads :id from URL
import { addToCart } from "../products/cartStorage";     // add product to cart
import { MOCK_PRODUCTS } from "../products/mockProducts"; // product list

export default function ProductDetails() {
  const { id } = useParams(); // gets product id from URL like /products/:id

  // Find the product that matches the URL id
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }, [id]);

  function handleAdd() {
    if (!product) return;     // safety check
    addToCart(product);       // store in cart
    alert(`Added to cart: ${product.name}`); 
  }

  return (
    <div>
      <h2>Product Details</h2>

      <p>
        <Link to="/products">← Back to Products</Link>
      </p>

      {!product ? (
        <p style={{ color: "crimson" }}>Product not found.</p>
      ) : (
        <div style={{ border: "1px solid #ddd", padding: 14, borderRadius: 8, maxWidth: 650 }}>
          <h3 style={{ marginTop: 0 }}>{product.name}</h3>

          <p><b>Price:</b> $ {product.price}</p>
          <p><b>Description:</b> {product.description}</p>

          <button type="button" onClick={handleAdd}>
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
}
