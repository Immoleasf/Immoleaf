const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String },
  city: { type: String },
  country: { type: String, default: 'Germany' },
  type: { type: String, enum: ['house', 'apartment', 'commercial'], default: 'house' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
