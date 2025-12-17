require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/eBuY';
const defaultImage = '/server/public/images/users/cartoon-pokemon-pikachu-character.png';
const jwtActivationkey = process.env.jwtActivationkey || 'adhfjkasgjfd23@';
const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientUrl = process.env.CLIENT_URL || "";
const uploadDir = process.env.UPLOAD_FILE || "public/images/users";


module.exports = {serverPort,mongodbUrl,defaultImage,jwtActivationkey,smtpUsername,smtpPassword,clientUrl,uploadDir};