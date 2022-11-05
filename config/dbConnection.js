const mongoose = require('mongoose');
const { logEvents } = require('../middleware/logger');

const connectDB = async() => {
    await mongoose.connect(process.env.DATABASE_URI,{
        dbName: 'project',
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => err ? logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log') : console.log("Connected to MongoDB"));    
};

module.exports = connectDB;