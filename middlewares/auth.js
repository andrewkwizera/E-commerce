const {Unauthorized} = require('http-errors')

const checkAuth = async(req,res,next)=>{
    try{
        if(!req.session.user) throw new Unauthorized('Please login')
        next()
    }catch(err){
        next(err)
    }
}
module.exports = checkAuth