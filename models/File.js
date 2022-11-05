const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
        fileName:{
            type: String,
            required: true
        },
        image:{
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = new mongoose.model('File', fileSchema);