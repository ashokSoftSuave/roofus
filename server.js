const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./index");


// const DB = process.env.Database_connection_string.replace(
//   "<password>",
//   process.env.mongoPassword
// );

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI).then(res => {
  console.log('database connection succussfull');
}).catch(err => {
  console.log('database connection failed', err);
})

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

