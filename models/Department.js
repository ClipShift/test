const mongoose = require('mongoose');

const departmentObject = {
    'Cardiology':'Cardiology',
    'ENT':'ENT',
    'Gastroenterology':'Gastroenterology',
    'Gynecology':'Gynecology',
    'Neurology':'Neurology',
    'Orthopedics':'Orthopedics',
    'Physiotherapy':'Physiotherapy',
    'Dietetics':'Dietetics',
    'admin': 'admin'
}

const departmentSchema = new mongoose.Schema({
    value: {
        type: String,
        enum: departmentObject
    }
});

module.exports = {departmentObject, departmentSchema}