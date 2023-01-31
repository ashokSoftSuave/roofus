const mongoose = require("mongoose");



const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
  },
  status: {
    type: String,
    default: "Open"
  },
  amount: {
    type: Number,
    required: [true, "please enter the amount"],
  },
  propertyId: {
    type: mongoose.Schema.ObjectId,
    ref: "properties",
    required: [true, "please select the property name"],
  },
  users:[ {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  }],
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})



const houseModel = mongoose.model("houses", schema);

module.exports = houseModel;
