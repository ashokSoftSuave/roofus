const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI).then(res => {
  console.log('database connection succussfull');
}).catch(err => {
  console.log('database connection failed', err);
})