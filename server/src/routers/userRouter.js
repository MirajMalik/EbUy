const express = require('express');
const { getUsers,getProfile } = require('../controllers/userController');
const userRouter = express.Router();


userRouter.get('/', getUsers);

userRouter.get('/profile', getProfile);




module.exports = userRouter;