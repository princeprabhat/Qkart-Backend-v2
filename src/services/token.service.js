const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
    type,
  };
  const token = jwt.sign(payload, secret);
  return token;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;
  const token = generateToken(user._id, accessTokenExpires, tokenTypes.ACCESS);

  return {
    access: {
      token: token,
      expires: new Date(accessTokenExpires * 1000),
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
