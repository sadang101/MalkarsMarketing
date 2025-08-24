const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Module title is required']
  },
  description: {
    type: String,
    required: [true, 'Module description is required']
  },
  content: {
    type: String,
    required: [true, 'Module content is required']
  },
  videoUrl: String,
  duration: {
    type: Number, // in minutes
    required: [true, 'Module duration is required']
  },
  order: {
    type: Number,
    required: true
  },
  quiz: {
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      marks: {
        type: Number,
        default: 1
      }
    }],
    passingScore: {
      type: Number,
      default: 70
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number, // in weeks
    required: [true, 'Course duration is required']
  },
  credits: {
    type: Number,
    required: [true, 'Number of credits is required']
  },
  imageUrl: String,
  instructor: {
    type: String,
    default: 'Dr. Vinod R. Malkar'
  },
  modules: [moduleSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['sales', 'marketing', 'business', 'other'],
    required: [true, 'Course category is required']
  },
  prerequisites: [String],
  learningOutcomes: [String],
  targetAudience: [String]
}, {
  timestamps: true
});

// Add text index for search functionality
courseSchema.index({ 
  title: 'text', 
  description: 'text',
  'modules.title': 'text',
  'modules.content': 'text'
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
