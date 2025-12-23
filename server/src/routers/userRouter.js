const express = require('express');
const { getUsers,getProfile,getUserById, deleteUserById, processRegister, activateUserAccount } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const { runValidation } = require('../validators');
const userRouter = express.Router();

//GET: api/users
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);
userRouter.post('/process-register', validateUserRegistration , runValidation , upload.single("image") , processRegister );  // image fieldname
userRouter.post('/verify', activateUserAccount);

userRouter.get('/profile', getProfile);




module.exports = userRouter;