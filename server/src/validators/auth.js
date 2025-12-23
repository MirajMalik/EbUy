const{body} = require('express-validator');



// registration validation

const validateUserRegistration = () =>{
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min : 5, max : 31})
    .withMessage('Name should be atleast 5 and less then 31 characters long')
};

module.exports = {validateUserRegistration};