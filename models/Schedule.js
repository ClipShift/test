const mongoose = require('mongoose');
const { departmentObject } = require('./Department')

const scheduleSchema = new mongoose.Schema({
        hospitalId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Hospital'
        },
        inTime: {
            type: Date,
            reqired: true
        },
        outTime: {
            type: Date,
            reqired: true
        },
        doctor:{
            type: String,
            required: true
        },
        department:{
            type:String,
            required: true,
            enum: Object.keys(departmentObject)
        }
    },{
        timestamps: true
    }
);

module.exports = new mongoose.model('Schedule', scheduleSchema);