const Hospital = require('../models/Hospital');
const Schedule = require('../models/Schedule');
const asyncHandler = require('express-async-handler');
const {validDate, validDocName} = require('../utils/Validation')
const { departmentObject } = require('../models/Department');

//@desc Get all schedules
//@route GET /schedules
//@access Public
const getAllSchedules = asyncHandler(async(req, res) => {
    const schedules = await Schedule.find().lean();
    if(!schedules?.length)
        return res.status(400).json({message: 'No Schedule found'});
    res.json(schedules);
});


//@desc Create new schedules
//@route POST /schedules
//@access Public
const createNewSchedule = asyncHandler(async(req,res) => {
    const { hospitalId, inTime, outTime, department, doctor } = req.body;

    if(!hospitalId || !inTime || !outTime || !department || !doctor)
        return res.status(400).json({message: 'All fields are required.'});
    
    if(!(validDate(inTime) && validDate(outTime)))
        return res.status(400).json({message: 'Kindly provide a valid timestamp.'});

    const inTimeObject = new Date(Date.parse(inTime));
    const outTimeObject = new Date(Date.parse(outTime));

    if (outTimeObject <= inTimeObject)
        return res.status(400).json({message: 'Out Time cannot be equal or greater than In Time'});

    if(!validDocName(doctor))
        return res.status(400).json({message: 'Kindly provide a valid doctor name.'});

    const hospital = Hospital.findById(hospitalId);

    if(!hospital)
        return res.status(400).json({message: 'Kindly provide an existing hospital'});

    const scheduleObject = { hospitalId, 'inTime': inTimeObject, 'outTime': outTimeObject, department, doctor };
    const schedule = await Schedule.create(scheduleObject);

    if (schedule)
        return res.status(201).json({message: `Schedule Registered`, ...schedule});
    else
        return res.status(400).json({message: 'Failed to register schedule.'})
});


//@desc Update schedules
//@route PATCH /schedules
//@access Public
const updateSchedule = asyncHandler(async(req,res) => {
    const { _id, hospitalId, inTime, outTime, department, doctor } = req.body;

    if(!_id || !hospitalId || !inTime || !outTime || !department || !doctor)
        return res.status(400).json({message: 'All fields are required.'});
    
    const schedule = await Schedule.findById(_id).exec();
    if(!schedule)
        return res.status(400).json({message: 'Kindly provide a valid schedule id.'});

    if(!(validDate(inTime) && validDate(outTime)))
        return res.status(400).json({message: 'Kindly provide a valid timestamp.'});

    const inTimeObject = new Date(Date.parse(inTime));
    const outTimeObject = new Date(Date.parse(outTime));

    if (outTimeObject <= inTimeObject)
        return res.status(400).json({message: 'Out Time cannot be equal or greater than In Time'});

    if(!validDocName(doctor))
        return res.status(400).json({message: 'Kindly provide a valid doctor name.'});

    const hospital = Hospital.findById(hospitalId);

    if(!hospital)
        return res.status(400).json({message: 'Kindly provide an existing hospital'});

    schedule.inTime = inTimeObject;
    schedule.outTime = outTimeObject;
    schedule.hospitalId = hospitalId;
    schedule.department = department;
    schedule.doctor = doctor;

    const updatedSchedule = await schedule.save();

    res.json({message: 'Updated schedule successfully', ...updatedSchedule});
});


//@desc deleteSchedule schedule
//@route DELETE /schedule
//@access Public
const deleteSchedule = asyncHandler(async(req, res) => {
    const {_id} = req.body;
    if(!_id)
        return res.status(400).json({message: 'Schedule ID requried.'});
    
    const schedule = await Schedule.findById(_id).exec();

    if(!schedule)
        return res.status(400).json({message: 'Schedule not found.'});
    
    const deletedSchedule = await Schedule.deleteOne();

    res.json({message: 'Deleted schedule successfully', ...deletedSchedule});
});

module.exports = {
    getAllSchedules,
    createNewSchedule,
    updateSchedule,
    deleteSchedule
}