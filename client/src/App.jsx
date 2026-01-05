import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/users/UserDetails";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Products from "./pages/products/Products";
import Cart from "./pages/products/Cart";
import ProductDetails from "../src/pages/products/ProductDetails";


export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1>EbUy</h1>

      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>

        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        <Link to="/register">Register</Link>
        <Link to="/verify">Verify</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
       
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </div>
  );
}
