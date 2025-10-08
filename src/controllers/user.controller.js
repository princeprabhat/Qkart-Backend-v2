const { status: httpStatus } = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const jwt = require("jsonwebtoken");

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const token = req.headers.authorization.split(" ")[1];

  if (jwt.decode(token).sub !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, "User not found");
  }

  const userData = await userService.getUserById(userId);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(userData);
});

const getAddressesByUserId = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.email != req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }
  const addresses = await userService.getUserAddressById(req.params.userId);
  res.status(httpStatus.OK).json({ addresses });
});

const addAddress = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.email != req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }

  const address = await userService.addAddress(user, req.body.address);

  res.status(httpStatus.CREATED).json({
    addresses: address,
  });
});

const deleteAddress = catchAsync(async (req, res) => {
  const addressId = req.body?.addressId;
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.email != req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }
  if (!addressId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "AddressId is required");
  }

  const addresses = await userService.deleteAddress(user, addressId);
  res.status(httpStatus.OK).json({
    addresses,
  });
});

module.exports = {
  getUser,
  addAddress,
  deleteAddress,
  getAddressesByUserId,
};
