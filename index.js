const express = require("express");
const app = express();
const cors = require('cors')
const helmet = require('helmet');

app.use(cors())
// app.use(cors({
//   origin : "*",
// }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

app.use(helmet());


module.exports = app;
