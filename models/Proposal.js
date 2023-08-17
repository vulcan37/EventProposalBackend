const mongoose = require('mongoose');
const ProposalSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventPlace: {
    type: String,
    required: true
  },
  proposaltype: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  foodPreferences: {
    type: String,
    required: true
  },
  events: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true,
    default: []
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  }
}, { timestamps: true })
module.exports = mongoose.model('Proposal', ProposalSchema)