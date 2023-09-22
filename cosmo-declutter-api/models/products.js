const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  imgLink: String,
  description: String,
  location: String,
});

modules.export = mongoose.model("Product", productSchema);
