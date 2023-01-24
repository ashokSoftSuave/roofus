const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./index");


const DB = process.env.Database_connection_string.replace(
  "<password>",
  process.env.mongoPassword
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DataBase connected");
  });


const port = 400;
const server = app.listen(port, () => {
  console.log(`listening to port ${port}`);
});


process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught rejection!!");
  console.log("closing server...");
  process.exit(1);
});


process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection!!");
  console.log("closing server...");
  server.close(() => {
    process.exit(1);
  });
});

