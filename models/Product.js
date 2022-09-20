const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    maxlength: 512,
    required: false
  },
  status: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema)