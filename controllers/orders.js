const Order = require('../models/Order')
const {BadRequest, NotFound} = require('http-errors')
const asyncHandler = require('../middlewares/async')


const createOrder = asyncHandler(async (req,res,next) => {
    const order = new Order(req.body)
    await order.save()

    res.status(201).json({
        success: true,
        data: order
    })
})

const getAllOrders = asyncHandler(async (req,res,next) => {
    const orders = await Order.find({})
    res.status(200).json({
        success:true,
        data: orders
    })
})

const editOrder = asyncHandler(async (req,res,next) => {
    if(!req.params.id){
        throw new BadRequest('Please provide the id of the order to edit')
    }

    let order = await Order.findById(req.params.id)
    if(!order){
        throw new NotFound('No order with the provided id')
    }

    order = await Order.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.status(200).json({
        success:true,
        data: order
    })

})

const deleteOrder = asyncHandler(async (req,res,next) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        mssg: "Order deleted successfully"
    })
})


module.exports = {
    createOrder,
    getAllOrders,
    editOrder,
    deleteOrder
}