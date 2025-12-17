const express = require('express');
const { getUsers,getProfile,getUserById, deleteUserById, processRegister, activateUserAccount } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const userRouter = express.Router();

//GET: api/users
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);
userRouter.post('/process-register', upload.single("image") ,processRegister);  // image fieldname
userRouter.post('/verify', activateUserAccount);

userRouter.get('/profile', getProfile);




module.exports = userRouter;