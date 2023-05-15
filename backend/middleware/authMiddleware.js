const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

const protect = async(req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(decoded)

            //GET USER FROM THE TOKEN
            req.user = await User.findById(decoded.id).select('-password')
            // console.log(req.user)

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    // if(!token) {
    //     res.status(401)
    //     throw new Error('not authorized, no token')
    // }
}

module.exports = {
    protect
}