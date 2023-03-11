const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const jwtSecret = process.env.JWTSECRET;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');

// GET USER DETAILS
router.post('/getcontact', authenticate, async (req, res)=> {
    try {
        const {token} = req.body;
        const decoded = jwt.verify(token, jwtSecret)
        const _id = mongoose.Types.ObjectId(decoded.prevuser.id)
        let userdata = await UserSchema.findOne({_id});
        res.status(200).json({user: userdata})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//SAVE USER MESSAGE
router.post('/contactus', async (req, res)=> {

    const {email, message} = req.body;

    const resData = await UserSchema.findOne({email})
    try {
        const userMessage = await resData.addMessage(message);
        await resData.save();
        res.status(200).json({success: true})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false})
    }
})

module.exports = router;