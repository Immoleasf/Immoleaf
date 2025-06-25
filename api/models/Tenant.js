// api/models/Tenant.js
const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);
