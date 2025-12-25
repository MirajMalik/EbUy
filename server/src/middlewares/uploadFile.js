const multer = require('multer');
// const path = require('path');
// const createError = require('http-errors');
const { UPLOAD_USER_IMG_DIR, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config');



const storage = multer.memoryStorage();


const fileFilter = (req,file,cb) => {
  if(!file.mimetype.startsWith("image/")){
    return cb(new Error('Only image files are allowed'),false);
  }

  if(file.size > MAX_FILE_SIZE){
    return cb(new Error('File Size exceeds the limit'),false);
  }

  if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
    return cb(new Error('File type not supported'),false);
  }

  cb(null,true);

};

const upload = multer({ 
  storage: storage, 
  // limits: { fileSize: MAX_FILE_SIZE},
  fileFilter : fileFilter,

 }); 

module.exports = upload;