const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./index");
const router = require("./router");


const DB = "mongodb+srv://roofus123:nz3B9aqtoUt7Ii0c@roofusdb.wjsknof.mongodb.net/roofus-db?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI).then(res => {
  console.log('database connection succussfull');
}).catch(err => {
  console.log('database connection failed', err);
})

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

