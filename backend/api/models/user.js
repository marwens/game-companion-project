const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },


    password: { type: String },
    facebook_id: String,
    google_id: String,
    device_token: String,

});


module.exports = mongoose.model('User', userSchema);