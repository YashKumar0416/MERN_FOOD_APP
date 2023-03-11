// const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User');
// dotenv.config({path: './config.env'})
const jwtSecret = "Tiskuhcythputhaithusmbhguyqleotg";

const authenticate = async (req, res, next)=> {
    // console.log(req.body)
    try {
        const token = req.body.token;
        const verifyToken = jwt.verify(token, jwtSecret)
        // console.log(verifyToken)

        const rootuser = await UserSchema.findOne({_id: verifyToken.prevuser.id})
        // if(!rootuser) {throw new Error('User not Found')}
        if(!rootuser) {
            return res.status(400).json({message: 'User not Found'})
        }

        req.token = token;
        req.rootuser = rootuser;
        req.userId = rootuser._id;
        next();
    } catch (err) {
        res.status(401).json({message: 'Unauthorized Access'})
        console.log(err)
    }
};

module.exports = authenticate;