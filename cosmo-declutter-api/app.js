const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config()
const authRouter = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const { user } = require("./middlewares/auth");


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.get("/api/auth", (req, res) => {
  res.send("Success. You're in");
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRoutes);
app.use("/api/cart-item", user, cartItemRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;