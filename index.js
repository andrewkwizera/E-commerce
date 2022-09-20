const express = require('express')
require('dotenv').config()
const session = require('express-session')
//const MongoStore = require('connect-mongo')
const redisStore = require('connect-redis')(session)
const redisClient = require('redis').createClient({legacyMode:true})

redisClient.connect().then().catch(err=>{console.error(err)})

 

const {connectToDb} = require('./db/mongo')
const {SESSION_SECRET} = process.env


connectToDb()
const app = express()

app.use(express.json())


app.use(session({
  store: new redisStore({client:redisClient}),
  saveUninitialized:false,
  resave:false,
  secret:SESSION_SECRET,
  cookie:{httpOnly:true}
  
}
))

//mapping routes
app.use('/api/v1/users',require('./routes/users'))
app.use('/api/v1/products', require('./routes/products'))
app.use('/api/v1/carts',require('./routes/userCarts'))
app.use('/api/v1/orders', require('./routes/orders'))


const PORT = process.env.PORT || 20000

app.listen(PORT, () => console.log(`App running on port ${PORT}`))