const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");




const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email)
   
    if(user && await user.isPasswordMatch(password)) {
      return user;
    }else{
      throw new ApiError(httpStatus.UNAUTHORIZED,"Incorrect email or password")

    }
    
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
};
