const Product = require("../models/productModel");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Products returned successfully",
      payload: { products },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts };
