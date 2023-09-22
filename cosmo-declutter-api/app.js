const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config()
const authRouter = require("./routes/authRoutes");
const { user } = require("./middlewares/auth");


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.send("Success. You're in");
});

app.use("/api/auth", authRouter);

app.get("/api/product", user, async (req, res) => {
  res.send("You got me. Haha!");
});

module.exports = app;
