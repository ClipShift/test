const mongoose = require('mongoose');
const { departmentObject } = require('./Department')

const hospitalSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        hospitalName: {
            type:String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        departments: [{
            type: String,
            validate:{
                validator: (dept) => departmentObject.hasOwnProperty(dept),
                message: (dept) => `${dept.value} is not a valid department.`
            },
            required: true
        }],
        file: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'File'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Hospital', hospitalSchema);