const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./index");
const router = require("./router");


const DB = "mongodb+srv://roofus123:nz3B9aqtoUt7Ii0c@roofusdb.wjsknof.mongodb.net/roofus-db?retryWrites=true&w=majority"

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DataBase connected");
  });

  app.use(router);


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

