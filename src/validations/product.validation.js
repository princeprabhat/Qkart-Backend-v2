const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3),
    category: Joi.string().required(),
    cost: Joi.number().required().min(1),
    rating: Joi.number().required().min(1).max(5),
    image: Joi.string().required(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).optional(),
    category: Joi.string().optional(),
    cost: Joi.number().min(1).optional(),
    rating: Joi.number().min(1).max(5).optional(),
    image: Joi.string().optional(),
  }),
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
};
