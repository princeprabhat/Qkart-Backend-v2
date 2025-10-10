const { Product } = require("../models");
const ApiError = require("../utils/ApiError");

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

module.exports = {
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
};
