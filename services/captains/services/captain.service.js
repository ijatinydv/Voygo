const captianModel = require('../models/captain.model')

module.exports.createCaptian = async function({
    firstName, lastName, email, password, color, plate, capacity, vehicleType
}){
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All fields are required")
    }
    const captain = captianModel.create({
        fullName:{firstName,lastName},
        email,
        password,
        vehicle:{
            color,plate,capacity,vehicleType
        }
    })
    return captain
}

module.exports.findNearbyCaptains = async({ltd,lng,radiusInKm})=>{
    if(!ltd || !lng || !radiusInKm){
        throw new Error("All fields are required")
    }
    const captains = await captianModel.find({
        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng], radiusInKm/6371]
            }
        }
    })
    return captains
}