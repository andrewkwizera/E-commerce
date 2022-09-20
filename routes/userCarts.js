const express = require('express')
const router = express.Router({mergeParams:true})

const {createCart,getAllCarts,getCartById,updateCart,deleteCart} = require('../controllers/carts')
const checkAuth= require('../middlewares/auth')

router.use(checkAuth)

router.route('/').post(createCart).get(getAllCarts)
router.route('/:id').get(getCartById).delete(deleteCart).patch(updateCart)

module.exports = router