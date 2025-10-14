const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
      ref: "User",
      trim: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        unitPrice: {
          type: Number,
          required: false,
        },
      },
    ],
    address: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "cod", "wallet", "other"],
      default: "wallet",
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "completed",
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports.Purchase = Purchase;
