
const multer = require('multer');
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create multer upload
const upload = multer({ storage });
module.exports = upload


