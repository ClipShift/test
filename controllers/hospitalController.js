const Hospital = require('../models/Hospital');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const File = require('../models/File');

//@desc Get all hospitals
//@route GET /hospital
//@access Public
const getAllHospitals = asyncHandler(async(req, res) => {
    const hospitals = await Hospital.find().select('-password').lean();
    if(!hospitals?.length)
        return res.status(400).json({message: 'No Hospitals found'});
    res.json(hospitals);
});

//@desc Create new hospitals
//@route POST /hospital
//@access Public
const createNewHospital = asyncHandler(async(req, res) => {
    const { username, hospitalName, password, departments, file } = req.body;
    if(!username || !hospitalName || !password || !Array.isArray(departments) || !departments.length || !file)
        return res.status(400).json({message: 'All fields are required'});
    
    const duplicate = await Hospital.findOne({hospitalName}).lean().exec();

    if(duplicate)
        return res.status(409).json({message: 'Duplicate Hospital'});

    const duplicateUser = await Hospital.findOne({username}).lean().exec();

    if(duplicateUser)
        return res.status(409).json({message: 'Duplicate User'});

    const hashedPassword = await bcrypt.hash(password, 10);
    const hospitalObject = { username, hospitalName, 'password': hashedPassword, departments, file}

    const hospital = await Hospital.create(hospitalObject);
    if(hospital)
        res.status(201).json({message: `Hospital ${hospitalName} created.`});
    else
        res.status(400).json({message: 'Invalid hospital data received'});
});

//@desc updateHospital hospitals
//@route PATCH /hospital
//@access Public
const updateHospital = asyncHandler(async(req, res) => {
    const { _id, username, hospitalName, password, departments } = req.body;

    if(!_id || !username || !hospitalName || !Array.isArray(departments) || !departments.length)
        return res.status(400).json({message: 'All fields are required'});
    
    const hospital = await Hospital.findById(_id).exec();
    if(!hospital)
        return res.status(400).json({message: 'No Hospital found'});

    const duplicate = await Hospital.findOne({username}).lean().exec();
    if(duplicate && duplicate?._id.toString() != _id)
        return res.status(409).json({message: 'Duplicate username'});
    
    hospital.username = username;
    hospital.hospitalName = hospitalName;
    hospital.departments = departments;

    if(password)
        hospital.password = await bcrypt.hash(password, 10);

    const updatedHospital = await hospital.save();

    res.json({message: `Updated ${updatedHospital.hospitalName}.`});
});

//@desc deleteHospital hospitals
//@route DELETE /hospital
//@access Public
const deleteHospital = asyncHandler(async(req, res) => {
    const {_id} = req.body;
    if(!_id)
        return res.status(400).json({message: 'Hospital ID requried.'});
    
    const hospital = await Hospital.findById(_id).exec();

    if(!hospital)
        return res.status(400).json({message: 'Hospital not found.'});
    
    const file = await File.findById(hospital.file).exec();
    
    const deletedHospital = await hospital.deleteOne();
    const deletedFile = await file.deleteOne();

    res.json({message: `${deletedHospital.hospitalName} deleted.`});
});

module.exports = {
    getAllHospitals,
    createNewHospital,
    updateHospital,
    deleteHospital
}