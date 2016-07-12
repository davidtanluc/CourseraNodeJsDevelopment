var mongoose = require('mongoose')
var Schema = mongoose.Schema

////// leadership schema ///////
var leaderSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    }, 
    
    {
    timestamps: true
    }
);

var Leadership = mongoose.model('Leader', leaderSchema);

// make this available to our Node applications
module.exports = Leadership;