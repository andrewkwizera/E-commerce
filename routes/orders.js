const express = require('express')

const {createOrder,getAllOrders,editOrder,deleteOrder} = require('../controllers/orders')
const checkAuth = require('../middlewares/auth')

const router = express.Router({mergeParams:true})

router.use(checkAuth)
router.route('/').post(createOrder).get(getAllOrders)
router.route('/:id').patch(editOrder).delete(deleteOrder)

module.exports = router