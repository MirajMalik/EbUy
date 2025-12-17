const multer = require('multer');
const path = require('path');
const { uploadDir } = require('../secret');
const UPLOAD_DIR = uploadDir;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(null,file.originalname.replace(extName,'') + extName);

  },
});

const upload = multer({ storage: storage });

module.exports = upload;