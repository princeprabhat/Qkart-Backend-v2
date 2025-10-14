const Joi = require("joi");
const { objectId, password } = require("./custom.validation");

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId, "userId"),
  }),
};

const addAddress = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    address: Joi.string().required().min(20),
  }),
};

const deleteAddress = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    addressId: Joi.string().custom(objectId).required(),
  }),
};
const promoteRole = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};
const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).optional(),
  }),
};

module.exports = {
  getUser,
  addAddress,
  deleteAddress,
  updateUser,
  promoteRole,
};
