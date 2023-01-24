const mongoose = require("mongoose");


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name!"],
  }
})


const user = mongoose.model("users", schema);

module.exports = user;

