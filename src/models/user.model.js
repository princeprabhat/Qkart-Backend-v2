const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcryptjs")



const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type:String,
      required:true,
      trim:true,
      unique:true,
      lowercase:true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      
    },
    password: {
      type: String,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    walletMoney: {
      type:Number,
      default:config.default_wallet_money,
      required:true,
      
    },
    address: {
      type: String,
      default: config.default_address,
    },
    isAdmin:{
      type:Boolean,
      default:false,
      required:false,
    }
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);


userSchema.statics.isEmailTaken = async function (email) {
  const userEmail = await this.findOne({ email: email });
  return !!userEmail;
};


userSchema.methods.isPasswordMatch = async function (password) {
try {
  
  return await bcrypt.compare(password,this.password)
} catch (error) {
  return error
}

};


userSchema.pre('save',async function(next){
if(!this.isModified('password')){
 return next();
}
try {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password,salt);
  this.password = hashedPassword;
  next();
} catch (error) {
  next(error);
}

})


userSchema.methods.hasSetNonDefaultAddress = async function () {
  const user = this;
   return user.address !== config.default_address;
};

const User = mongoose.model("User",userSchema)
module.exports.User = User