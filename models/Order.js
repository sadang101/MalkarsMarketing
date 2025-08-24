const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR',
    required: true
  },
  status: {
    type: String,
    enum: ['created', 'attempted', 'paid', 'failed', 'refunded'],
    default: 'created'
  },
  paymentId: {
    type: String,
    default: null
  },
  receipt: {
    type: String,
    default: function() {
      return 'order_' + this._id.toString();
    }
  },
  paymentMethod: {
    type: String,
    default: 'online'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  error: {
    code: String,
    description: String,
    source: String,
    step: String,
    reason: String
  }
}, {
  timestamps: true
});

// Add index for faster queries
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: 1 });

// Virtual for formatted amount (in rupees)
orderSchema.virtual('amountInRupees').get(function() {
  return (this.amount / 100).toFixed(2);
});

// Method to generate order ID for Razorpay
orderSchema.methods.generateOrderId = function() {
  return 'order_' + this._id.toString();
};

// Method to generate receipt
orderSchema.methods.generateReceipt = function() {
  return 'rcpt_' + this._id.toString();
};

// Pre-save hook to set receipt number
orderSchema.pre('save', function(next) {
  if (!this.receipt) {
    this.receipt = this.generateReceipt();
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
