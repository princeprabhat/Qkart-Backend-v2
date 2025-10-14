const isAdmin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const express = require("express");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
const userValidation = require("../validations/user.validation");
const productValidation = require("../validations/product.validation");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

// Get all users
router.get("/users", auth, isAdmin, adminController.getAllUsers);
// Create a normal user
router.post(
  "/users/create",
  auth,
  isAdmin,
  validate(authValidation.register),
  adminController.createNormalUser
);
// Create a admin user
router.post(
  "/users/createAdmin",
  auth,
  isAdmin,
  validate(authValidation.register),
  adminController.createAdminUser
);
// Update normal user role to admin
router.patch(
  "/users/adminRole/edit",
  auth,
  isAdmin,
  validate(userValidation.promoteRole),
  adminController.promoteRole
);
// Update a User (Normal Fields: email, name, password)
router.put(
  "/users/:userId",
  auth,
  isAdmin,
  validate(userValidation.updateUser),
  adminController.updateUser
);

// Delete a user
router.delete(
  "/users/deleteUser/:userId",
  auth,
  isAdmin,
  validate(userValidation.getUser),
  adminController.deleteUser
);

// Get all products
router.get("/products", auth, isAdmin, adminController.getAllProducts);
// Create a product
router.post(
  "/products/create",
  auth,
  isAdmin,
  validate(productValidation.createProduct),
  adminController.createProduct
);
// Delete a product
router.delete(
  "/products/deleteProduct/:productId",
  auth,
  isAdmin,
  validate(productValidation.getProduct),
  adminController.deleteProduct
);
// Update a product
router.put(
  "/products/updateProduct/:productId",
  auth,
  isAdmin,
  validate(productValidation.updateProduct),
  adminController.updateProduct
);
// Get all purchase from inventory
router.get("/inventory/all", auth, isAdmin, adminController.getInventory);

module.exports = router;
