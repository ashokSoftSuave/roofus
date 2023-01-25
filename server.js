const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./index");

const router = require("./router");

// initalize db connection
require('./db-connection/db');

app.use(router);



const server = app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
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

