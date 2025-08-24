const express = require('express');
const router = express.Router();
const { protect } = require('../utils/jwt');
const crypto = require('crypto');
const Order = require('../models/Order');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Create Razorpay order
// @route   POST /api/payments/orders
// @access  Private
router.post('/orders', protect, async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // Find the course
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Create order in database
    const order = new Order({
      user: req.user._id,
      course: course._id,
      amount: course.price * 100, // Convert to paise
      currency: 'INR',
      status: 'created'
    });
    
    const createdOrder = await order.save();
    
    // In a real app, you would create an order with Razorpay here
    // For now, we'll just return the order details
    res.status(201).json({
      id: createdOrder._id,
      currency: createdOrder.currency,
      amount: createdOrder.amount,
      key: process.env.RAZORPAY_KEY_ID // Your Razorpay key ID
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    
    // Find the order
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // In a real app, you would verify the payment signature with Razorpay
    // For now, we'll just simulate a successful verification
    const isSignatureValid = true; // Replace with actual verification
    
    if (!isSignatureValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }
    
    // Update order status
    order.status = 'completed';
    order.paymentId = paymentId;
    await order.save();
    
    // Enroll user in the course
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enrolledCourses: order.course }
    });
    
    res.json({
      success: true,
      message: 'Payment verified and course enrolled successfully',
      orderId: order._id
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get payment history for user
// @route   GET /api/payments/history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('course', 'title price')
      .sort('-createdAt');
      
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get payment details
// @route   GET /api/payments/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('course', 'title price')
      .populate('user', 'name email');
      
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if the order belongs to the user or if the user is an admin
    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
