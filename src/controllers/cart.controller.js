const { status: httpStatus } = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { cartService } = require("../services");
const ApiError = require("../utils/ApiError");

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByUser(req.user);
  res.status(httpStatus.OK).json({ cart });
});

const getCartCount = catchAsync(async (req, res) => {
  const cartLength = await cartService.getCartLength(req.user);

  if (cartLength == null)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Some error occured while getting cart length"
    );

  res.status(httpStatus.OK).json({ count: cartLength });
});

const addProductToCart = catchAsync(async (req, res) => {
  const cart = await cartService.addProductToCart(
    req.user,
    req.body.productId,
    req.body.quantity
  );

  res.status(httpStatus.CREATED).send(cart);
});

const updateProductInCart = catchAsync(async (req, res) => {
  const { quantity } = req.body;

  if (quantity > 0) {
    const cart = await cartService.updateProductInCart(
      req.user,
      req.body.productId,
      req.body.quantity
    );
    res.status(httpStatus.OK).send(cart);
  } else if (quantity == 0) {
    const newCart = await cartService.deleteProductFromCart(
      req.user,
      req.body.productId
    );
    res.status(httpStatus.OK).send(newCart);
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Quantity cannot be less than zero"
    );
  }
});

const checkout = catchAsync(async (req, res) => {
  const addressId = req.body?.addressId;
  if (!addressId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "addressId is required to set the selected address"
    );
  }

  const cart = await cartService.checkout(req.user, addressId);

  return res.status(httpStatus.OK).json({ cart });
});

module.exports = {
  getCart,
  addProductToCart,
  updateProductInCart,
  checkout,
  getCartCount,
};
