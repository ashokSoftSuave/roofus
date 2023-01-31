const mongoose = require('mongoose');

const property_schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: String,
    type: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
});


const propertyModel = mongoose.model('properties',property_schema)

module.exports = { propertyModel };
