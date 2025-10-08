const express = require("express");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// TODO: CRIO_TASK_MODULE_AUTH - Implement "/v1/auth/register" and "/v1/auth/login" routes with request validation
const validateAuthSignUp = validate(authValidation.register);
router.post("/register", validateAuthSignUp, authController.register);

const validateAuthLogin = validate(authValidation.login);
router.post("/login", validateAuthLogin, authController.login);

module.exports = router;
