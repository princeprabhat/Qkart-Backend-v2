const { status: httpStatus } = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
  const newUser = await userService.createUser(req.body);

  const token = await tokenService.generateAuthTokens(newUser);
  if (newUser)
    res.status(httpStatus.CREATED).json({ user: newUser, tokens: token });
});

const login = catchAsync(async (req, res) => {
  if (!req.body?.email || !req.body?.password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Email and password are required" });
    // throw new ApiError(httpStatus.BAD_REQUEST, "Email and password are required") ;
  }
  const data = await authService.loginUserWithEmailAndPassword(
    req.body.email,
    req.body.password
  );
  const token = await tokenService.generateAuthTokens(data);

  res.status(httpStatus.OK).json({ user: data, tokens: token });
});

module.exports = {
  register,
  login,
};
