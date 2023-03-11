const mongoose = require('mongoose');

const NewUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
    }
})

module.exports = mongoose.model('newuser', NewUserSchema);