const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    items: [{ type: mongoose.Schema.ObjectId, ref: "CartItem" }],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;