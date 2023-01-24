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
    type: Number
  },
  propertyId: {
    type: mongoose.Schema.ObjectId,
    ref: "properties",
    required: [true, "please select the property name"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
})



const houseModel = mongoose.model("houses", schema);

module.exports = houseModel;
