const mongoose = require('mongoose');
const { mongodbUrl } = require('../secret');

const connectDB = async (options) => {
    try {
        await mongoose.connect(mongodbUrl,options = {});
        console.log("MongoDB is connected");

        mongoose.connection.on('error',(error)=>{
            console.error('DB connection error : ',error);
        });

        
    } catch (error) {
        console.error('Couldnt connect to DB : ',error.toString());
    }
    
};

module.exports = connectDB;

