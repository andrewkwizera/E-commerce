const mongoose = require("mongoose");


const User = require('../models/User')
const Product = require('../models/Product')


const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  shippingMethod: {
    type: String,
    default: 'free'
  },
  paymentMethod: {
    type: String,
    default: '"cash_on_delivery"'
  },
  grandTotal: {
    type: Number,
    required: true,
    min: [0, 'Price can not be less then 0.']
  },
  items:[
    {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

module.exports = mongoose.model("Order", OrderSchema);