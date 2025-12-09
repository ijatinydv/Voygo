const jwt = require('jsonwebtoken')
const blackListTokenModel = require('../models/blackListToken.model')
const captianModel = require('../models/captain.model')

module.exports.authCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    const isBlackListed = await blackListTokenModel.findOne({token:token})

    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captianModel.findById(decoded._id)

        req.captain = captain
        return next()
    }
    catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}