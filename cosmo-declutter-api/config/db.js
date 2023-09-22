const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.ATLAS_URI;
async function connectDb() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectDb;
