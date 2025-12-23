const { validationResult } = require('express-validator');
const { errorResponse } = require('../controllers/responseController');

// can be reused by many routes
const runValidation = async (req,res,next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return errorResponse(res,{
                statusCode : 422,
                message : errors.array()[0].msj,
            });
        }
        return next();
    } catch (error) {
        return next(error)
    }
};

module.exports = {runValidation};