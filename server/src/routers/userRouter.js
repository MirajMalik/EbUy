const express = require('express');
const { getUsers,getProfile, getUser, deleteUser } = require('../controllers/userController');
const userRouter = express.Router();

//GET: api/users
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);

userRouter.get('/profile', getProfile);




module.exports = userRouter;