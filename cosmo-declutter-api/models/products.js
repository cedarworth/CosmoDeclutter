const mongoose = require("mongoose");
import { useLocation } from "react-router-dom";

function ProductPage() {
  const location = useLocation();
  const data = location.state.data;

  // Now you can use this data in your component
}

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  imgLink: String,
  description: String,
  location: String,
});

modules.export = mongoose.model("Product", productSchema);
