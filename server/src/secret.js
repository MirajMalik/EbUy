require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/eBuY';

module.exports = {serverPort,mongodbUrl};