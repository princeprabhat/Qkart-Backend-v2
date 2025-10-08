const express = require("express");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement a route definition for `/v1/users/:userId`

const validateUser = validate(userValidation.getUser);

router.get("/:userId", auth, validateUser, userController.getUser);

router.get(
  "/address/:userId",
  auth,
  validateUser,
  userController.getAddressesByUserId
);

// Add the address
router.post(
  "/address/:userId",
  auth,
  validate(userValidation.addAddress),
  userController.addAddress
);

// delete the address
router.delete(
  "/address/:userId",
  auth,
  validate(userValidation.deleteAddress),
  userController.deleteAddress
);

module.exports = router;
