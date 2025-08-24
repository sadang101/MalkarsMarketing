const express = require('express');
const router = express.Router();
const { protect, admin } = require('../utils/jwt');
const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    const courses = await Course.find({ ...keyword, isActive: true });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course && course.isActive) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const course = new Course({
      title: 'Sample title',
      description: 'Sample description',
      price: 0,
      duration: 6,
      credits: 3,
      category: 'other',
      user: req.user._id,
      imageUrl: '/images/sample.jpg',
      modules: []
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      credits,
      imageUrl,
      category,
      prerequisites,
      learningOutcomes,
      targetAudience,
      isActive
    } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
      course.title = title || course.title;
      course.description = description || course.description;
      course.price = price || course.price;
      course.duration = duration || course.duration;
      course.credits = credits || course.credits;
      course.imageUrl = imageUrl || course.imageUrl;
      course.category = category || course.category;
      course.prerequisites = prerequisites || course.prerequisites;
      course.learningOutcomes = learningOutcomes || course.learningOutcomes;
      course.targetAudience = targetAudience || course.targetAudience;
      course.isActive = isActive !== undefined ? isActive : course.isActive;

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      await course.remove();
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add module to course
// @route   POST /api/courses/:id/modules
// @access  Private/Admin
router.post('/:id/modules', protect, admin, async (req, res) => {
  try {
    const { title, description, content, videoUrl, duration } = req.body;
    
    const course = await Course.findById(req.params.id);
    
    if (course) {
      const newModule = {
        title,
        description,
        content,
        videoUrl,
        duration,
        order: course.modules.length + 1
      };
      
      course.modules.push(newModule);
      const updatedCourse = await course.save();
      
      res.status(201).json(updatedCourse.modules[updatedCourse.modules.length - 1]);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update module
// @route   PUT /api/courses/:id/modules/:moduleId
// @access  Private/Admin
router.put('/:id/modules/:moduleId', protect, admin, async (req, res) => {
  try {
    const { title, description, content, videoUrl, duration, isPublished } = req.body;
    
    const course = await Course.findById(req.params.id);
    
    if (course) {
      const moduleIndex = course.modules.findIndex(
        (module) => module._id.toString() === req.params.moduleId
      );
      
      if (moduleIndex !== -1) {
        course.modules[moduleIndex].title = title || course.modules[moduleIndex].title;
        course.modules[moduleIndex].description = description || course.modules[moduleIndex].description;
        course.modules[moduleIndex].content = content || course.modules[moduleIndex].content;
        course.modules[moduleIndex].videoUrl = videoUrl || course.modules[moduleIndex].videoUrl;
        course.modules[moduleIndex].duration = duration || course.modules[moduleIndex].duration;
        
        if (isPublished !== undefined) {
          course.modules[moduleIndex].isPublished = isPublished;
        }
        
        const updatedCourse = await course.save();
        res.json(updatedCourse.modules[moduleIndex]);
      } else {
        res.status(404).json({ message: 'Module not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete module
// @route   DELETE /api/courses/:id/modules/:moduleId
// @access  Private/Admin
router.delete('/:id/modules/:moduleId', protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (course) {
      const moduleIndex = course.modules.findIndex(
        (module) => module._id.toString() === req.params.moduleId
      );
      
      if (moduleIndex !== -1) {
        course.modules.splice(moduleIndex, 1);
        await course.save();
        res.json({ message: 'Module removed' });
      } else {
        res.status(404).json({ message: 'Module not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
