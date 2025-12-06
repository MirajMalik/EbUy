const {Schema,model} = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImage } = require('../secret');

const userSchema = new Schema({
    name : {
        type : String,
        required : [true,'User name is required'],
        trim : true,
        maxlength : [31,'User name must be within 31 characters'],
        minlength : [5,'User name must be more than 5 characters'],
    },

    email : {
        type : String,
        required : [true,'User email is required'],
        trim : true,
        unique : true,
        lowercase : true,
        validate : {
            validator: function(v) {
                return /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(v);
            },

            message : 'Enter valid email',
        }
    },

    password : {
        type : String,
        required : [true,'User password is required'],
        minlength : [5,'User password must be more than 5 characters'],
        set : (v) => bcrypt.hashSync(v , bcrypt.genSaltSync(10)),
     },

    image : {
        type : String,
        default : defaultImage,
    },

    address : {
        type : String,
        required : [true,'User address is required'],
    },
    phone : {
        type : String,
        required : [true,'User number is required'],
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
    isBanned : {
        type : Boolean,
        default : false,
    },

  
}, {timestamps:true});


const User = model('Users',userSchema);
module.exports = User;