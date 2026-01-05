import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";


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
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </Layout>
  );
}
