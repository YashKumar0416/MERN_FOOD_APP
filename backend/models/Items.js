const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('food_item', ItemSchema);