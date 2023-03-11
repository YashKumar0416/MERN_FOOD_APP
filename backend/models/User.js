const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [ {
        message: {
            type: String
        }
    }
    ]
})

UserSchema.methods.addMessage = async function(message) {
    try {
        this.messages = this.messages.concat({message});
        await this.save();
        return this.messages
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoose.model('User', UserSchema);