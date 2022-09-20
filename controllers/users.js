
const User = require("../models/User")



const bcrypt = require('bcrypt');
const session = require('express-session')

const {NotFound, BadRequest, Unauthorized} = require('http-errors')
const asyncHandler = require('../middlewares/async')
const {createUserActivationToken} = require('../services/auth')
const {sendUserActivationEmail} = require('../services/mail')

const register = asyncHandler(async (req, res, next) => {
    const existingUser = await User.findOne({email:req.body.email})
    if(existingUser) throw new BadRequest('a user with this email already exists')
    const user = new User(req.body)
    await user.save()
    const activationToken = await createUserActivationToken(user)
    await sendUserActivationEmail(activationToken, user)
    res.status(201).json({
        success:true,
        data:user
    })
})



const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({email: req.body.email})
    if(!user) throw new NotFound('no user with this email exists')
    const valid = await bcrypt.compare(password, user.password)
    if(!valid) throw new BadRequest('invalid password')
    const sessionData =  {
        id: user._id,
        authenticated: true

    }
    req.session.user = sessionData
    res.status(200).json({
        success:true,
        data:user
    })


})


const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({_id:req.session.user.id})
    res.status(200).send({
        success: true, 
        data: user
    })
})


const getUsers = asyncHandler(async (req, res, next) => {
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    console.log(req.session)

    res.status(201).json({
        success:true, 
        data: await User.find({})
    })
})

const logout = asyncHandler (async(req,res,next)=>{
    try{
        req.session.destroy(()=>{
            res.json({success:true})
        })
    }catch(err){
        next(err)
    }
})

module.exports = {
   register,
   login,
   getUser,
    getUsers,
    logout
}