require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const { protect, admin } = require('./utils/jwt');

// Import routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // In development, serve static files from the root directory
  app.use(express.static(path.join(__dirname)));
  
  // Handle all routes by serving index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
  console.log('Press Ctrl+C to stop the server');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
