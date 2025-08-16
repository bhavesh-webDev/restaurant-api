const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "food" }],
    payment: {
      type: String,
      enum: ["cash_on_delivery ", "UPI", "Internet Banking"],
      default: "cash_on_delivery",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

const order = mongoose.model("order", ordersSchema);
module.exports = order;
