const mongoose = require('mongoose');
const { productSchema } = require('./product.model');
const config = require("../config/config");
const validator = require('validator');



const cartSchema = mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
      unique:true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    cartItems:{
      type:[{
        product:productSchema,
        quantity:Number,
      }],

    },
    paymentOption:{
      type:String,
      default:config.default_payment_option,
    },
  },
  {
    timestamps: false,
  }
);


/**
 * @typedef Cart
 */
const Cart = mongoose.model('Cart', cartSchema);

module.exports.Cart = Cart;