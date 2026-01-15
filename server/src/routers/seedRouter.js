const express = require('express');
const { seedUser, getSeedUser, seedProducts } = require('../controllers/seedController');
const seedRouter = express.Router();


seedRouter.get('/users',seedUser);
seedRouter.get('/users/:id',getSeedUser);
seedRouter.post("/products", seedProducts);

module.exports = {seedRouter};