const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const UPLOAD_DIR = process.env.UPLOAD_FILE || "public/images/users";
const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 2097152 ;
const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES || ['jpg','jpeg','png'] ;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(null,file.originalname.replace(extName,'') + extName);
  },
});


const fileFilter = (req,file,cb) => {
  const extName = path.extname(file.originalname);

  if(!ALLOWED_FILE_TYPES.includes(extName.substring(1))) {
    const error = createError(400,'File Type Not Allowed');
    return cb(error);
  }

  cb(null,true);

};

const upload = multer({ 
  storage: storage, 

  limits: { fileSize: MAX_FILE_SIZE},

  fileFilter,

 }); 

module.exports = upload;