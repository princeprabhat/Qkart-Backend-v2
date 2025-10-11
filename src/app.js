const express = require("express");
const compression = require("compression");
const cors = require("cors");
const { status: httpStatus } = require("http-status");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./config/passport");
const helmet = require("helmet");
const passport = require("passport");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes"
  }
});

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
// app.options(cors());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
jwtStrategy(passport);

app.use('/api',limiter);
// Reroute all API request starting with "/v1" route
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;
