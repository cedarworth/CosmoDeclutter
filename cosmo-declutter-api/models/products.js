const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imgLink: Object,
  description: { type: String, required: true },
  location: { type: String, required: true },
}, {
  versionKey: false,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
