const express = require('express');
const { getUsers,getProfile,getUserById, deleteUserById, processRegister, activateUserAccount } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const { runValidation } = require('../validators');
const userRouter = express.Router();




//GET: api/users
userRouter.get('/profile', getProfile);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);
userRouter.post(
    '/process-register',
    upload.single("image") ,
    validateUserRegistration ,
    runValidation ,
    processRegister 
);  // image fieldname

userRouter.post('/verify', activateUserAccount);






module.exports = userRouter;