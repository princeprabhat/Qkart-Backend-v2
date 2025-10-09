const { status: httpStatus } = require("http-status");
const { Cart, Product, User } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

const getCartByUser = async (user) => {
  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    try {
      const newCart = await Cart.create({
        email: user.email,
        paymentOption: config.default_payment_option,
        cartItems: [],
      });
      if (!newCart) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);

      return newCart;
    } catch (error) {
      throw error;
    }
  }
  return cart;
};

const addProductToCart = async (user, productId, quantity) => {
  if (quantity <= 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Quantity cannot be less than or equal to zero"
    );
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product doesn't exist in database"
    );
  }

  const cart = await Cart.findOne({ email: user.email });

  if (!cart) {
    try {
      const newCart = await Cart.create({
        email: user.email,
        paymentOption: config.default_payment_option,
        cartItems: [{ product, quantity }],
      });
      if (!newCart) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);

      return newCart;
    } catch (error) {
      throw error;
    }
  }

  try {
    const itemExist = cart.cartItems.find(
      (ele) => ele.product._id == productId
    );
    if (itemExist)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Product already in cart. Use the cart sidebar to update or remove product from cart"
      );

    cart.cartItems.push({ product, quantity });
    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};

const updateProductInCart = async (user, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product doesn't exist in database"
    );
  }

  const cart = await Cart.findOne({ email: user.email });
  if (!cart) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User does not have a cart. Use POST to create cart and add a product"
    );
  }
  const itemExist = cart.cartItems.find((ele) => ele.product._id == productId);
  try {
    if (!itemExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
    }

    cart.cartItems.forEach((el) => {
      if (el.product._id == productId) el.quantity = quantity;
    });

    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};

const deleteProductFromCart = async (user, productId) => {
  try {
    const cart = await Cart.findOne({ email: user.email });
    if (!cart) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User does not have a cart");
    }

    const itemExist = cart.cartItems.find(
      (ele) => ele.product._id == productId
    );
    if (!itemExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
    }

    const updatedCart = cart.cartItems.filter(
      (el) => el.product._id != productId
    );
    cart.cartItems = updatedCart.length > 0 ? updatedCart : [];

    await cart.save();
    return cart;
  } catch (error) {
    throw error;
  }
};

const checkout = async (user, addressId) => {
  //should throw 404 error if cart is not present
  const cart = await Cart.findOne({ email: user.email });

  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
  }

  //should throw 400 error if user's cart doesn't have any product
  if (cart.cartItems.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User's cart doesn't have any product"
    );
  }

  const costTotal = cart.cartItems.reduce(
    (ac, el) => el.quantity * el.product.cost + ac,
    0
  );
  //should throw 400 error if address is not set - when User.hasSetNonDefaultAddress() returns false
  const addressCheck = user.addresses.some(
    (addr) => addr._id.toString() === addressId
  );

  if (!addressCheck) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Address is not in the list");
  }
  //should throw 400 error if wallet balance is insufficient

  if (user.walletMoney < costTotal) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Wallet balance is insufficient"
    );
  }

  //should update user balance and empty the cart on success
  user.walletMoney -= costTotal;

  await user.save();

  cart.cartItems = [];
  await cart.save();

  return {
    cartId: cart._id,
    remainingCartItems: cart.cartItems,
    totalCost: costTotal,
    remainingWallet: user.walletMoney,
    selectedAddress: addressId,
  };
};

module.exports = {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  checkout,
};
