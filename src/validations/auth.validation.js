const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body:Joi.object().keys({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().custom(password,"password").required(),
    name:Joi.string().required(),
    isAdmin:Joi.boolean().optional().default(false)
    
  }),
  
};

const login = {
  body:Joi.object().keys({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().custom(password,"password").required()
  }),
 
};

module.exports = {
  register,
  login,
};
