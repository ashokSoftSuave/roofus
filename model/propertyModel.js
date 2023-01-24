const mongoose = require('mongoose');

const property_schema = new mongoose.Schema({
    name: String,
    address: String,
    type: String,
    createdAt: Date,
});


const propertyModel = mongoose.model('properties',property_schema)

module.exports = { propertyModel };
