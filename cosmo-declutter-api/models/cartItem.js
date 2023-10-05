const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;