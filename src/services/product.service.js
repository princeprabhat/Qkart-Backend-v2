const { Product } = require("../models");
const ApiError = require("../utils/ApiError");
const { status: httpStatus } = require("http-status");

const getProductById = async (id) => {
  return await Product.findById(id);
};

const getProducts = async () => {
  const products = await Product.find({});

  return products;
};

const createProduct = async (productData) => {
  const product = await Product.create({ ...productData });
  return product;
};

const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

const updateProduct = async (productId, updateData) => {
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cant find the Product to update");
  }
  return updatedProduct;
};

module.exports = {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
