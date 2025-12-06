const express = require('express');
const { seedUser, getSeedUser } = require('../controllers/seedController');
const seedRouter = express.Router();


seedRouter.get('/users',seedUser);
seedRouter.get('/users/:id',getSeedUser);

module.exports = {seedRouter};