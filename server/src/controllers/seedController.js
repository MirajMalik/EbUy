const data = require("../data");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const seedUser = async(req,res,next) => {
    try {
        await User.deleteMany({});
        const users = await User.insertMany(data.users);
        return res.status(201).json(users);
    } catch (error) {
        next(error);
    }

};



const seedProducts = async (req, res, next) => {
  try {
    const sampleProducts = [
      {
        name: "Wireless Headphones",
        price: 1999,
        description: "Comfortable wireless headphones with deep bass.",
        imageUrl: "",
        stock: 20,
      },
      {
        name: "Smart Watch",
        price: 2499,
        description: "Track steps, heart rate, and notifications.",
        imageUrl: "",
        stock: 15,
      },
      {
        name: "Gaming Mouse",
        price: 799,
        description: "High precision mouse with RGB lighting.",
        imageUrl: "",
        stock: 50,
      },
      {
        name: "Backpack",
        price: 1299,
        description: "Water-resistant backpack for daily use.",
        imageUrl: "",
        stock: 30,
      },
      {
        name: "Perfume",
        price: 1599,
        description: "Long lasting fragrance for all day freshness.",
        imageUrl: "",
        stock: 25,
      },
    ];

    // 1) remove old products
    await Product.deleteMany({});

    // 2) insert new products
    const inserted = await Product.insertMany(sampleProducts);

    return res.status(201).json({
      success: true,
      message: "Products seeded successfully",
      payload: { count: inserted.length, products: inserted },
    });
  } catch (err) {
    next(err);
  }
};




const getSeedUser = async(req,res,next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(201).json(user);

    } catch (error) {
        next(error);
    }
}

module.exports = {seedUser,getSeedUser,seedProducts};