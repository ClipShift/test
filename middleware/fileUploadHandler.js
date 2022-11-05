const multer = require('multer');
const maxSize = 2*1024*1024;

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const uploadHandler = multer({
    storage: storage,
    limits: {fileSize: maxSize}
}).single('image_file');

module.exports = uploadHandler;