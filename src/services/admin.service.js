const { User } = require("../models");
const { Purchase } = require("../models");
const { status: httpStatus } = require("http-status");
const ApiError = require("../utils/ApiError");

const createUser = async (userBody) => {
  const { email } = userBody;

  const checkEmail = await User.isEmailTaken(email);
  if (checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, "Email already taken");
  }

  const result = await User.create({
    ...userBody,
    isAdmin: true,
  });

  return result;
};

const makeAdmin = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User does not exist, Please create the user first"
    );
  }
  if (user.isAdmin) {
    throw new ApiError(httpStatus.CONFLICT, "User is already an admin user");
  }

  user.isAdmin = true;
  await user.save();

  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist.");
  }
  return user;
};

const getInventoryData = async () => {
  const inventory = await Purchase.find({});

  return inventory;
};

module.exports = {
  createUser,
  makeAdmin,
  deleteUser,
  getInventoryData,
};
