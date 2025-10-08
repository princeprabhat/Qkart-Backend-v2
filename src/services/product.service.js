const { Product } = require("../models");

const getProductById = async (id) => {
  return await Product.findById(id);
};

const getProducts = async () => {
  const products = await Product.find({});

  return products;
};

module.exports = {
  getProductById,
  getProducts,
};
