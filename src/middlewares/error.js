const {status:httpStatus} = require("http-status");
const config = require("../config/config");



const errorHandler = (err, req, res, next) => {
  // Default values if error isn't an ApiError

  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  // Prevent leaking sensitive error details in production
  if (config.env === "production" && statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    message = "Internal Server Error";
  }

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {     
    console.error("❌ Error:", err);
  }

 res.send({Error:response.message});
};

module.exports = {
  errorHandler,
};
