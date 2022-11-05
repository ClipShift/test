const File = require('../models/File');
const asyncHandler = require('express-async-handler');
const uploadHandler = require('../middleware/fileUploadHandler');

//@desc Get file
//@route GET /file
//@access Public
const getFileById = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    if(!_id)
        res.status(400).json({message: 'Kindly provide File ID.'});

    const file = await File.findById(_id).lean();
    
    if(!file)
        return res.status(400).json({message: `No file with ${_id} exists.`});

    return res.json(file);
});

//@desc Upload File
//@route POST /file
//@access Public
const uploadFile = asyncHandler(async(req,res) => {
    
    if(!req.file)
        res.status(400).json({message: 'Kindly provide file to upload'});

    uploadHandler(req, res, (err) => {
        if(err){
            res.status(400).json({message: err.message})
        }
        else{
            const newFile = new File({
                fileName: req.file.originalname,
                image:{
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })
            newFile.save()
            .then(() => res.send('File uploaded successfuly.'))
            .catch((err) => res.send(`File upload unsuccessful: ${err}`))
        }
    })
});


//@desc Delete File
//@route Delete /file
//@access Public
const deleteFile = asyncHandler(async(req, res) => {
    const { _id } = req.body;

    if(!_id)
        res.status(400).json({message: 'Kindly provide file ID.'})

    const file = await File.findById(_id).exec();

    if(!file)
        return res.status(400).json({message: `No file with ${_id} exists.`});
    
    const deletedFile = await file.deleteOne();

    res.json({message: `File with ${_id} deleted.`});
})

module.exports = {
    getFileById,
    uploadFile,
    deleteFile
}