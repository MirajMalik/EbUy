const createError = require('http-errors');
const { users } = require('../data');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const  mongoose  = require('mongoose');
const findWithId = require('../services/findItem');
const fs = require('fs');






const getUsers = async(req,res,next) => {
    try {
        const search = req.query.search || "";
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;

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


    return successResponse(res,{
        statusCode : 200,
        message : 'Users were returned Successfully',
        payload : {
            users : users,
            pagination: {
            totalPages : Math.ceil(count/limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page-1 : null,
            nextPage: page + 1 <= Math.ceil(count/limit) ? page + 1 : null,
            }
        }
    });
        
    } catch (error) {
        next(error);
        
    }
};


const getUser = async(req,res,next) => {
    try {
        const id = req.params.id;
        const options = {password : 0};
        const user = await findWithId(id,options);

        return successResponse(res,{
        statusCode : 200,
        message : 'User is returned Successfully',
        payload : {user},
    });

    } catch (error) {
        
        next(error);
    }
};




const deleteUser = async(req,res,next) => {
    try {
        const id = req.params.id;
        const user = await findWithId(id);

        // for deleting the user image
        const userImagePath = user.image;
        fs.access(userImagePath,(err)=>{
            if(err){
                console.error('User Image does not exist');
            }else{
                fs.unlink(userImagePath,(err)=>{
                    if(err) throw err;
                    console.log('User Image is Deleted');
                })
            }
        });


        await User.findByIdAndDelete({
            _id: id,
            isAdmin: false,
        });

        return successResponse(res,{
        statusCode : 200,
        message : 'User is deleted Successfully',
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


module.exports = {getUsers,getProfile,getUser,deleteUser};