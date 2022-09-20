const mongoose = require("mongoose");
require('dotenv').config
//const config = require('../config/index')

function connectToDb() {
  mongoose
    .connect(process.env.MONGOOSE_URI)
    .then((connection) => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log(`unable to connect to database: ${error.message}`);
    });
}
module.exports = { connectToDb };