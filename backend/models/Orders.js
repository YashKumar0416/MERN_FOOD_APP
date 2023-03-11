const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    orders: [{
        order_date: {
            type: String,
        },
        qty: {
            type: String,
        },
        price: {
            type: String,
        },
        order_data: []
        // order_data: [{
        //     name: {type: String},
        //     price: {type: String},
        //     qty: {type: String},
        //     size: {type: String},
        // }]
    }]
})
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     order_date: {
//         type: String
//     },
//     qty: {
//         type: String,
//     },
//     price: {
//         type: String
//     },
//     order_data: {
//         type: Array,
//         required: true
//     }
// })
// const OrderSchema = mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     order_data: {
//         type: Array,
//         required: true
//     }
// })

module.exports = mongoose.model("Order", OrderSchema);