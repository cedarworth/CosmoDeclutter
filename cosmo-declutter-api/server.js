const app = require("./app");
const connectDb = require("./config/db");

async function startServer() {
  try {
    await connectDb();
    console.log("connected to the database");
    app.listen(4000, () => {
      console.log("server started on port", 4000);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
