const{body} = require('express-validator');



// registration validation

const validateUserRegistration = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min : 5, max : 31})
    .withMessage('Name should be atleast 5 and less then 31 characters long'),

    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email Address'),

    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min : 5})
    .withMessage('password should be atleast 5 characters long'),

    body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({min : 3})
    .withMessage('password should be atleast 3 characters long'),

    body('phone')
    .trim()
    .notEmpty()
    .withMessage('phone is required'),


    body('image')
    .optional()
    .isString()
    .withMessage('image is required'),


    

];

module.exports = {validateUserRegistration};