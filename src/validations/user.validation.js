const Joi = require("joi");
const { objectId } = require("./custom.validation");


const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId,'userId')
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

module.exports = {
  getUser,
  addAddress,
  deleteAddress
};
