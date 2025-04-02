const mongoose = require('mongoose');

const DataItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['personal', 'financial', 'medical', 'professional', 'other'],
    default: 'personal'
  },
  data: {
    type: String,
    required: true
  },
  isEncrypted: {
    type: Boolean,
    default: true
  },
  blockchainVerified: {
    type: Boolean,
    default: false
  },
  blockchainHash: {
    type: String
  },
  blockchainTxId: {
    type: String
  },
  accessControl: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    accessLevel: {
      type: String,
      enum: ['read', 'write', 'admin'],
      default: 'read'
    },
    expiresAt: {
      type: Date
    }
  }],
  tags: [String],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Update the lastUpdated timestamp before saving
DataItemSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('DataItem', DataItemSchema);
