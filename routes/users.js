const express = require('express')

const {register, login, getUser,getUsers,logout} = require('../controllers/users')
const checkAuth = require('../middlewares/auth')

const router = express.Router({mergeParams:true});

router.route('/').post(register).get(checkAuth, getUsers)
router.route('/login').post(login)
router.route('/logout').post(logout)

module.exports = router 
