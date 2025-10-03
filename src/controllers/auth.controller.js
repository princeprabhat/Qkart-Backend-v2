const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");


const register = catchAsync(async (req, res) => {
  const newUser = await userService.createUser(req.body)
  const token = await tokenService.generateAuthTokens(newUser)
 res.status(httpStatus.CREATED).json({user:newUser,tokens:token})
});


const login = catchAsync(async (req, res) => {
 const data =  await authService.loginUserWithEmailAndPassword(req.body.email,req.body.password)
 const token = await tokenService.generateAuthTokens(data)
   res.status(httpStatus.OK).json({user:data,tokens:token})


});

module.exports = {
  register,
  login,
};
