const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { users } = require('../data');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const  mongoose  = require('mongoose');
const findWithId = require('../services/findItem');
const deleteImage = require('../helper/deleteUser');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationkey, clientUrl } = require('../secret');
const emailWithNodeMailer = require('../helper/email');
const fs = require('fs').promises;


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


const getUserById = async(req,res,next) => {
    try {
        const id = req.params.id;
        const options = {password : 0};
        const user = await findWithId(User,id,options);

        return successResponse(res,{
        statusCode : 200,
        message : 'User is returned Successfully',
        payload : {user},
    });

    } catch (error) {
        
        next(error);
    }
};

const updateUserById = async (req,res,next) => {
    try{
        const userId = req.params.id;
        const options = {password : 0};
        const user = await findWithId(User,userId,options);

        const updateOptions = {
            new: true,
            runValidators: true,
            context: 'query',
        };

        let updates = {};

        // option -1 
        // if(req.body.name) {
        //     updates.name = req.body.name;
        // }
        // if(req.body.password) {
        //     updates.password = req.body.password;
        // }
        // if(req.body.phone) {
        //     updates.phone = req.body.phone;
        // }
        // if(req.body.address) {
        //     updates.address = req.body.address;
        // }

        // option -2
        for(let key in req.body) {
            if(['name','password','phone','address'].includes(key)) {
                updates[key] = req.body[key];
            };
        };

        const image = req.file;
        if(image) {
            if(image > 1024 * 1024 * 2) {
                throw createError(400,'Image file is too large.File must be less then 2Mb'); // image size max 2 mb
            };
            updates.image = image.buffer.toString('base64');
        };

        const updatedUser = await User.findByIdAndUpdate(userId,updates,updateOptions).select("-password");

        if(!updatedUser) {
            throw createError(404,'User with this id doesnt exists');
        };



        return successResponse(res,{
            statusCode : 200,
            message : 'User is updated Successfully',
            payload: updatedUser ,
        });

 } catch (error) {  
        next(error);
    }
};



const deleteUserById = async(req,res,next) => {
    try {
        const id = req.params.id;
        const user = await findWithId(User,id);

        // for deleting the user image
        const userImagePath = user.image;

        deleteImage(userImagePath);
        

        // fs.access(userImagePath,(err)=> {
        //     if(err){
        //         console.error('User Image does not exist');
        //     }else{
        //         fs.unlink(userImagePath,(err)=>{
        //             if(err) throw err;
        //             console.log('User Image is Deleted');
        //         })
        //     }
        // });


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

const processRegister =  async (req,res,next) => {
    try {
        const {name,email,password,phone,address} = req.body;

        const imageFile = req.file;

        if(!imageFile){
            throw createError(400,'Image file is required');
        };

        if(imageFile > 1024 * 1024 * 2){
            throw createError(400,'Image file is too large.File must be less then 2Mb');
        };

        const imageBufferString = imageFile.buffer.toString('base64');
        
        const existedUser = await User.exists({email : email});
        if(existedUser){
            throw createError(409,'User with this email is already exists.Please Sign IN'); // 409 for conflict
        };

        // create jwt

        const token = createJSONWebToken( 
            {name,email,password,phone,address, image: imageBufferString } , 
            jwtActivationkey , 
            '10m');

        // prepare email
        const emailData = {
            email,
            subject: "Account Activation Email",
            html: `
                <h2>Hello ${name}</h2>
                <p>Please click here <a href="${clientUrl}/verify?token=${token}">" target="_blank"> activate your account</a> </p>
            `
        }



        // send email with nodemailer
        try {
         await emailWithNodeMailer(emailData);
        } catch (emailError) {
            next(createError(500,'Failed to send verification email'));
            return;
        }

        


        return successResponse(res,{
        statusCode : 200,
        message : `Please go to your ${email} for completing registration process`,
        payload : {token},
    });

    } catch (error) {
        next(error);
    }
};


const activateUserAccount =  async (req,res,next) => {
    try {
        const token = req.body.token;
        if(!token) throw createError(404,'token not found');

        try {
             const decoded = jwt.verify(token,jwtActivationkey);
             if(!decoded) throw createError(401,'user is not verified');

             const existedUser = await User.exists({email : decoded.email});
             if(existedUser){
                throw createError(409,'User with this email is already exists.'); // 409 for conflict
            }
             //console.log(decoded);
             await User.create(decoded);

             return successResponse(res,{
                statusCode : 201,
                message : `User is registered successfully`,
             });
            
        } catch (error) {
            if(error.name==='TokenExpiredError') {
                throw createError(401,'token has expired');
            } else if(error.name === 'JsonWebTokenError') {
                throw createError(401,'Invalid token');
            } else {
                throw error;
            }
        }


    } catch (error) {
        next(error);
    }
};


module.exports = {getUsers,getProfile,getUserById,deleteUserById,processRegister,activateUserAccount,updateUserById};