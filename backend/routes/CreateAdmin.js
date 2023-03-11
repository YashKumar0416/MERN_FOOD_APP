const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "Tiskuhcythputhaithusmbhguyqleotg";
const AdminSchema = require('../models/Admin');

router.post('/registeradmin',
 [body('email').isEmail(),
 body('phone', 'Min 10 characters required').isLength({min: 10}),
 body("password").isLength({min: 5})
] ,async (req, res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const {name, email, phone, address, password} = req.body;
    try {
        const prevuser = await AdminSchema.findOne({email});
        if(!prevuser) {
            
            //PASSWORD HASHING
            let salt = await bcrypt.genSalt(12)
            let secpassword = await bcrypt.hash(password, salt);
            
            // const newuser = await AdminSchema.create({name, email, password: secpassword, created: date});
            const newuser = await AdminSchema.create({name, email,phone, address, password: secpassword});
            if (newuser) {
                return res.status(200).json({message: "Admin created successfully"})
            } else {
                return res.status(400).json({message: "No admin created"})
            }
        }else {
            return res.status(400).json({message: "Admin Already Exists"})
        }
    } catch (error) {
        res.status(401).json({error: error.message})
    }


    // console.log(password)

    // const salt = await bcrypt.genSalt(10);
    // let secpassword = await bcrypt.hash(password, salt);
    // // console.log(secpassword)

    // try {
    //     await AdminSchema.create({
    //         name,email,phone,address,password:secpassword
    //     })
    //     res.json({success: true})
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).json({success: false})
    // }
})

router.post('/loginadmin',
 [body("email").isEmail(),
body("password").isLength({min: 5})] ,
async (req, res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        const admin = await AdminSchema.findOne({email})
        if(!admin) {
            return res.json(400).json({error: "No user found"})
        }

        const pwdcompare = await bcrypt.compare(password, admin.password)
        if(!pwdcompare) {
            return res.status(400).json({error: "Invalid Credentials"})
        }

        const data = {
            admin: {
                id: admin.id
            }
        }

        const authTokenAdmin = jwt.sign(data, jwtSecret);
        return res.status(200).json({success: true, authTokenAdmin})

    } catch (error) {
        console.log(error)
        res.status(400).json({error: "No user Found"})
    }

})

module.exports = router;