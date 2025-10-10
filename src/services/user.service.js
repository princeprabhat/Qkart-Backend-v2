const { User } = require("../models");
const { status: httpStatus } = require("http-status");
const ApiError = require("../utils/ApiError");

const getUserById = async (id) => {
  const userResult = await User.findOne({ _id: id });
  return userResult;
};

const getUserByEmail = async (email) => {
  try {
    const userResult = await User.findOne({ email: email });
    return userResult;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, "must be a valid email");
  }
};

const createUser = async (userBody) => {
  const { email } = userBody;

  const checkEmail = await User.isEmailTaken(email);
  if (checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, "Email already taken");
  }

  const result = await User.create({ ...userBody, isAdmin: false });

  return result;
};

const getUserAddressById = async (id) => {
  const user = await User.findById(id, { addresses: 1 });
  return user.addresses;
};

const addAddress = async (user, newAddress) => {
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "")
      .trim();

  const normalizedNew = normalize(newAddress);

  const addressExists = user.addresses.some(
    (addr) => normalize(addr.address) === normalizedNew
  );

  if (addressExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Address already exists, Please use different characters from the existing ones"
    );
  }

  user.addresses.push({ address: newAddress });
  await user.save();
  return user.addresses;
};

const deleteAddress = async (user, addressId) => {
  const addressExist = user.addresses.some(
    (addr) => addr._id.toString() === addressId
  );
  if (!addressExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Address not found");
  }

  user.addresses = user.addresses.filter(
    (addr) => addr._id.toString() !== addressId
  );
  await user.save();
  return user.addresses;
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserAddressById,
  addAddress,
  deleteAddress,
};
