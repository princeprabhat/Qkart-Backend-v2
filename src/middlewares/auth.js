const passport = require("passport");
const {status:httpStatus} = require("http-status");
const ApiError = require("../utils/ApiError");


const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
 
 try {

  if(!user ||err){
   throw new ApiError(httpStatus.UNAUTHORIZED,"Please authenticate")
   
  }

  req.user=user;
  
  
  resolve();
  
 }catch (error) {
  reject(error)
 }


};


const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
  
};

module.exports = auth;