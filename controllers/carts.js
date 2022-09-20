const session = require('express-session')

const Cart = require('../models/UserCart')
const asyncHandler = require('../middlewares/async')


const createCart = asyncHandler(async (req,res,next) => {
    const cart = new Cart(req.body)
    await cart.save()

    res.status(201).json({
        success: true,
        data: cart
    })
})

const getAllCarts = asyncHandler( async (req,res,next) => {
    const carts = await Cart.find({})
    res.status(200).json({
        success: true,
        data: carts
    })
})

const getCartById = asyncHandler(async (req,res,next) => {
    const cart = await Cart.findOne({_id:req.params.id})
    res.status(200).json({
        success: true,
        data: cart
    })
})

const deleteCart = asyncHandler(async (req,res,next) => {
    await Cart.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        message:"Cart deleted successfully"
    })

})

const updateCart = asyncHandler(async (req, res, next)=>{
    if(!req.id){
        throw new BadRequest('you must provide id for the cart')
    }
    let cart = await Cart.findById(req.params.id)
    if(!product){
        throw new NotFound('Cart with that id not found')
    }

    cart = await Cart.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })

    res.status(200).json({
        success: true,
        data: cart
    })
    
})

module.exports = {
    createCart,
    getAllCarts,
    getCartById,
    deleteCart,
    updateCart
}