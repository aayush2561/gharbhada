const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = '';

    if (file.fieldname === 'profileImage') {
      uploadPath = path.join(__dirname, '../uploads/profile');
    } else if (file.fieldname === 'postImage') {
      uploadPath = path.join(__dirname, '../uploads/post');
    }
     else {
      uploadPath = path.join(__dirname, '../uploads/blog'); 
    }

    require('fs').mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } 
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
