const express = require('express');
const router = express.Router();
const OrderSchema = require('../models/Orders');
const authenticate = require('../middleware/authenticate');

//SAVE ORDER DATA
router.post('/saveorder', async (req, res)=> {
    
    const { email, order_data, qty, price, order_date } = req.body;
    let emailId = await OrderSchema.findOne({email})

    if (emailId === null) {
        try {
            await OrderSchema.create({email, orders: [{order_date, qty, price, order_data}]})
            .then(()=> {
                res.json({success: true})
            }).catch(err => console.log(err))
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    } else {
        try {
            await OrderSchema.updateOne({email}, {$push: {orders: {order_date, qty, price, order_data}}})
            .then(()=> {
                res.json({success: true})
            }).catch(err => console.log(err))
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

//GET ORDER DATA
router.post('/myorders', authenticate, async (req, res)=> {
    try {
        const { token, email } = req.body;
        let orderData = await OrderSchema.findOne({email})
        res.json({orderData: orderData})
    } catch (error) {
        res.send("Server Error", error.message)
    }
})

module.exports = router;