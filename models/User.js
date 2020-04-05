const mongoose = require('mongoose');

const user = mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength : 3,
        unique : true,
        trim : true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Users', user)