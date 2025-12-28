const mongoose = require('mongoose')

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
})

// Use existing model if already compiled, otherwise create new one
const blackListTokenModel = mongoose.models.blackListToken || mongoose.model("blackListToken", blackListTokenSchema)

module.exports = blackListTokenModel