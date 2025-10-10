const { User } = require("../models");
const { status: httpStatus } = require("http-status");
const ApiError = require("../utils/ApiError");

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }

    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      throw new ApiError(httpStatus.FORBIDDEN, "Access denied: Admin only");
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAdmin;
