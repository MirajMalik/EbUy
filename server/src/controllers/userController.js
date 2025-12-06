const createError = require('http-errors');
const { users } = require('../data');
const User = require('../models/userModel');






const getUsers = async(req,res,next) => {
    try {
        const search = req.query.search || "";
        const page = req.query.page || 1;
        const limit = req.query.limit || 1;

        const searchRegExp = new RegExp('.*' + search + '.*' , 'i'); // search based on name
        const filter = {
            isAdmin: {$ne: true},
            $or:[
                {name:{$regex: searchRegExp}},
                {email:{$regex: searchRegExp}},
                {phone:{$regex: searchRegExp}},
            ]
        };

        const options = {password : 0};

        const users = await User.find(filter,options).limit(limit).skip((page-1)*limit);
        const count = await User.find(filter).countDocuments();
        if(!users){
            throw createError(404,'No users found');
        }
        res.status(200).send({
        message : 'users are returned',
        users : users,
        pagination: {
            totalPages : Math.ceil(count/limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page-1 : null,
            nextPage: page + 1 <= Math.ceil(count/limit) ? page + 1 : null,
        }
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