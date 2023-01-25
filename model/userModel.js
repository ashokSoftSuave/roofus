const mongoose = require("mongoose");


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name!"],
  },
  amount: {
    type: Number,
    required: [true, "please enter the amount"]
  }
})


const user = mongoose.model("users", schema);

module.exports = user;

