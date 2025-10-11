const express = require("express");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");

const router = express.Router();

const validateAuthSignUp = validate(authValidation.register);
router.post("/register", validateAuthSignUp, authController.register);

const validateAuthLogin = validate(authValidation.login);
router.post("/login", validateAuthLogin, authController.login);

module.exports = router;
