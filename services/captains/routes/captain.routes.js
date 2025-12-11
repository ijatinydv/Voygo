const express = require('express')
const {body} =require('express-validator')
const router = express.Router()
const captainController = require('../controllers/captain.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name must be atleast 3 character long'),
    body('fullName.lastName').isLength({min:3}).withMessage('Last name must be atleast 3 character long'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 character long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be 3 character long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be 3 character long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle' , 'auto']).withMessage('Invalid vehicleType')
],
captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 character long')
],
captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain, captainController.logoutCaptain)

router.get('/:id',captainController.getCaptainById)

router.get('/nearby-captains',authMiddleware.authUser,captainController.getNearbyCaptains)

module.exports = router