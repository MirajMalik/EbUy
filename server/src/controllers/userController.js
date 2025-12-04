const createError = require('http-errors');






const getUsers = (req,res,next) => {
    try {
        res.status(200).send({
        message : 'users are returned',
    });
        
    } catch (error) {
        next(error);
        
    }
};


const getProfile = (req,res) => {
    try {
        res.status(200).send({
        message : 'user profile is returned',
     });
        
    } catch (error) {
        next(error);
        
    }
};


module.exports = {getUsers,getProfile};