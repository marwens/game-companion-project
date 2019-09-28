const mongoose = require('mongoose');

const partySchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
});


module.exports = mongoose.model('Party', partySchema);