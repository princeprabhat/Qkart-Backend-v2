const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");


const router = express.Router();

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Reroute all API requests beginning with the `/v1/users` route to Express router in user.route.js
router.use('/v1/users',userRoute)

router.use('/v1/auth',authRoute)


// TODO: CRIO_TASK_MODULE_AUTH - Reroute all API requests beginning with the `/v1/auth` route to Express router in auth.route.js 
router.use("/v1/products", productRoute);

router.use("/v1/cart", cartRoute);

module.exports = router;
