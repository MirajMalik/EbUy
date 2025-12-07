const express = require('express');
const { getUsers,getProfile, getUser } = require('../controllers/userController');
const userRouter = express.Router();

//GET: api/users
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

userRouter.get('/profile', getProfile);




module.exports = userRouter;