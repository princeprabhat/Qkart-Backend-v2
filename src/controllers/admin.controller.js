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
  const products = await userService.getAllUsers();
  if (!products) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting products"
    );
  }
  res.status(httpStatus.OK).json({ products });
});

const createNormalUser = catchAsync(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  if (!newUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating user"
    );
  }
  res.status(httpStatus.CREATED).json({ newUser });
});

const createAdminUser = catchAsync(async (req, res) => {
  const newUser = await adminService.createUser(req.body);
  if (!newUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating admin user"
    );
  }

  res.status(httpStatus.CREATED).json({ newUser });
});

const promoteRole = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await adminService.makeAdmin(userId);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while promoting user"
    );
  }

  res.status(httpStatus.OK).json({ user: result });
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
  res.status(httpStatus.OK).json({ products });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body);
  if (!product) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating product"
    );
  }
  res.status(httpStatus.CREATED).json({ product });
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
  res.status(httpStatus.OK).json({ message: "Product deleted successfully" });
});

const updateProduct = () => {};

const getInventory = () => {};

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
};
