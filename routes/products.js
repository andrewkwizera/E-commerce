const express = require('express')

const {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct} = require('../controllers/products')
const checkAuth = require('../middlewares/auth')

const router = express.Router({mergeParams:true})

router.use(checkAuth)
router.route('/').post(createProduct).get(getAllProducts)
router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct)

module.exports = router 
