const express = require('express');
const router = express.Router();
const CategorySchema = require('../models/Category');
const OrderSchema = require('../models/Orders');
const ItemSchema = require('../models/Items');

//GET FOOD DATA
router.get('/foodData', async (req, res)=> {
    try {
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.log(error)
    }
})

//GET FOOD CATEGORY
router.get('/getcategory', async(req, res)=> {
    try {
        const category = await CategorySchema.find();
        res.status(200).json({data: category, user: req.rootuser})
    } catch (error) {
        res.status(400).json({error: "No Data Found"})
    }
})

module.exports = router;