const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");
const adminRoute = require("./admin.route");

const router = express.Router();

router.use("/v1/users", userRoute);
router.use("/v1/admin", adminRoute);

router.use("/v1/auth", authRoute);

router.use("/v1/products", productRoute);

router.use("/v1/cart", cartRoute);

module.exports = router;
