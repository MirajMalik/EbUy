const multer = require('multer');
const path = require('path');
const createError = require('http-errors');
const { UPLOAD_USER_IMG_DIR, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMG_DIR)
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(null,file.originalname.replace(extName,'') + extName);
  },
});


const fileFilter = (req,file,cb) => {
  const extName = path.extname(file.originalname);

  if(!ALLOWED_FILE_TYPES.includes(extName.substring(1))) {

    return cb(new Error('File Type Not Allowed'),
    false);
  }

  cb(null,true);

};

const upload = multer({ 
  storage: storage, 

  limits: { fileSize: MAX_FILE_SIZE},

  fileFilter,

 }); 

module.exports = upload;