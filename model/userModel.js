const mongoose = require("mongoose");


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name!"],
  },
  houses: [{
    id: {
      type: mongoose.Schema.ObjectId
    },
    startDate: {
      type: Date,
    }
  }]
  // amount: {
  //   type: Number,
  //   required: [true, "please enter the amount"]
  // }
})


const user = mongoose.model("users", schema);

module.exports = user;

