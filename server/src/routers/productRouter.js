const express = require("express");
const { getProducts } = require("../controllers/productController");

const productRouter = express.Router();

// GET: /api/products
productRouter.get("/", getProducts);

module.exports = productRouter;

