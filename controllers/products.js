const Product = require("../models/Product")
const session = require('express-session')

const {NotFound, BadRequest, Unauthorized} = require('http-errors')
const asyncHandler = require('../middlewares/async')

const createProduct = asyncHandler(async (req, res, next) => {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json({
        success:true,
        data:product
    })
})

const getProductById = asyncHandler(async (req, res, next) => {
    const product = await Product.findOne({_id:req.params.id})
    res.status(200).send({
        success: true, 
        data: product
    })
})


const getAllProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({})
    res.status(201).json({
        success:true, 
        data:products
    })
})

const deleteProduct = asyncHandler(async (req,res,next) => {
    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })

})

const updateProduct = asyncHandler(async (req, res, next)=>{
    if(!req.id){
        throw new BadRequest('you must provide id for the product')
    }
    let product = await Product.findById(req.params.id)
    if(!product){
        throw new NotFound('Product with that id not found')
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })

    res.status(200).json({
        success: true,
        data: product
    })
    
})

module.exports = {
   createProduct,
   getAllProducts,
   getProductById,
   deleteProduct,
   updateProduct
}
