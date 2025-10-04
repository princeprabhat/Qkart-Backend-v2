const { Product } = require("../models");


const getProductById = async (id) => {
  return Product.findById(id);
};


const getProducts = async () => {
  return await Product.find({});
};

module.exports = {
  getProductById,
  getProducts,
};
