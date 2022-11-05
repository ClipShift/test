const express = require('express');
const router = express.Router();
const FileController = require('../controllers/fileController'); 

router.route('/')
    .get(FileController.getFileById)
    .post(FileController.uploadFile)
    .delete(FileController.deleteFile)

module.exports = router;