const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const jwtSecret = process.env.JWTSECRET;
const authenticate = require('../middleware/authenticate');

//SAVE USER IN DATABASE
router.post('/createuser', 
    [body('email').isEmail(),
    body('phone', 'Invalid phone number').isLength({ min: 10 }),
    body('password', 'Min password length: 5').isLength({ min: 5 }),]
    ,async (req, res)=> {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {name, email, phone, address, password} = req.body;
        const prevuser = await UserSchema.findOne({email})

        if(prevuser) {
            res.status(400).json({message: "User already registered", success: false})
        } else {

            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(password, salt);
            try {
                await UserSchema.create({
                    name, email, phone, address,
                    password: secPassword
                })
                res.json({message: 'User registered successfully', success: true})

            } catch (error) {
                console.log(error)
                res.json({success: false})
            }
    }
})

//CHECKS IF USER IS PRESENT OR NOT
router.post('/loginuser',
    [body('email').isEmail(),
    body('password').isLength({ min: 5 }),]
    ,async (req, res)=> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;

        try {
            const prevuser = await UserSchema.findOne({email});
            if (prevuser) {
                let pwdCompare = await bcrypt.compare(password, prevuser.password);
                if(pwdCompare) {

                    let data = {
                        prevuser: {
                            id: prevuser._id
                        }
                    }
    
                    //JWT TOKEN GENERATION
                    let authToken = await jwt.sign(data, jwtSecret);
                    return res.status(200).json({message: "User Found", authToken, prevuser})
                } else {
                    return res.status(400).json({message: "Invalid Credentials"})
                }
            } else {
                return res.status(400).json({message: "Invalid Credentials"})
            }

        } catch (error) {
            console.log(error)
            res.status(400).json({error: "No user found"})
        }
})

//GET USER DETAILS
router.post('/getuser', authenticate, async(req, res)=> {
    try {
        const {token} = req.body;
        const decoded = jwt.verify(token, jwtSecret)
        const _id = mongoose.Types.ObjectId(decoded.prevuser.id)
        let userdata = await UserSchema.findOne({_id});
        res.status(200).json({userdata})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//UPDATE USER DETAILS
router.post('/updateuser', authenticate, async (req, res)=> {
    const {token, name, phone, address} = req.body;

    if(!name || !phone || !address) {
        return res.status(400).json({message: "Enter Details Carefully"})
    }

    try {
        const {token} = req.body;
        const decoded = jwt.verify(token, jwtSecret)
        const _id = mongoose.Types.ObjectId(decoded.prevuser.id)
        const data = await UserSchema.findOneAndUpdate({_id},
            {
                "$set": {
                "name": name, "phone": phone, "address": address
            }
        })
        
        if(data) {
            return res.status(200).json({success: true})
        } else {
            return res.status(400).json({success: false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false})
    }
})

module.exports = router;