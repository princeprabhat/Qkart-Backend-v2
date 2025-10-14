const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  adminService,
  productService,
} = require("../services");
const { status: httpStatus } = require("http-status");
const ApiError = require("../utils/ApiError");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  if (!users) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting users"
    );
  }
  res.status(httpStatus.OK).json({ data: users });
});

const createNormalUser = catchAsync(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  if (!newUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating user"
    );
  }
  res.status(httpStatus.CREATED).json({ data: newUser });
});

const createAdminUser = catchAsync(async (req, res) => {
  const newUser = await adminService.createUser(req.body);
  if (!newUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating admin user"
    );
  }

  res.status(httpStatus.CREATED).json({ data: newUser });
});

const promoteRole = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await adminService.makeAdmin(email);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while promoting user"
    );
  }

  res.status(httpStatus.OK).json({ data: result });
});
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { email, name, password } = req.body || {};
  if (!email && !name && !password)
    throw new ApiError(httpStatus.BAD_REQUEST, "No Data Provided to update");

  const updatedUser = await adminService.updateUser(userId, req.body);
  if (!updatedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found or Update failed");
  }

  res.status(httpStatus.OK).json({ user: updatedUser });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await adminService.deleteUser(userId);
  if (!deletedUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while deleting user"
    );
  }

  res.status(httpStatus.OK).json({ message: "User deleted successfully" });
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await productService.getProducts();
  if (!products) {
    throw new ApiError(httpStatus.NOT_FOUND, "No product found");
  }
  res.status(httpStatus.OK).json({ data: products });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  if (!product) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating product"
    );
  }
  res.status(httpStatus.CREATED).json({ data: product });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await productService.deleteProduct(productId);
  if (!deletedProduct) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Product does not exist, or something went wrong"
    );
  }
  res.status(httpStatus.OK).json({ data: "Product deleted successfully" });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = await productService.updateProduct(
    productId,
    req.body
  );
  if (!updatedProduct) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while updating the product"
    );
  }
  res.status(httpStatus.OK).json({ data: updatedProduct });
});

const getInventory = catchAsync(async (req, res) => {
  const inventoryData = await adminService.getInventoryData();
  if (!inventoryData) {
    throw new ApiError(httpStatus.NOT_FOUND, "No inventory data available");
  }
  res.status(httpStatus.OK).json({ data: inventoryData });
});

module.exports = {
  getAllUsers,
  createNormalUser,
  createAdminUser,
  promoteRole,
  deleteUser,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getInventory,
  updateUser,
};
