const mongoose = require('mongoose');

const user = mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength : 3,
        trim : true
    },
    email : {
        type : String,
        required : true,
        minlength : 6,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        trim : true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Users', user)