const mongoose = require("mongoose");

const User = require('../models/User')
const Product = require('../models/Product')

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
      
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);