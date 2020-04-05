const mongoose = require('mongoose');

const exercise = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
}, {
    timestamps : true
}
);

module.exports = mongoose.model('Exercises', exercise)