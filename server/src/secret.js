require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/eBuY';
const defaultImage = '/server/public/images/users/cartoon-pokemon-pikachu-character.png';

module.exports = {serverPort,mongodbUrl,defaultImage};