const mongoose = require("mongoose");
const validator = require("validator");


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
})


const adminUser = mongoose.model("admin-users", schema);

module.exports = adminUser;

