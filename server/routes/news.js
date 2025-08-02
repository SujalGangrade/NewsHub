//news.js

import express from 'express';
import { body, param, query } from 'express-validator';
import News from '../models/News.js';
import { auth, requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

// Validation rules
const createNewsValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters long'),
  body('author')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters'),
  body('category')
    .isIn(['Technology', 'Politics', 'Sports', 'Entertainment'])
    .withMessage('Category must be one of: Technology, Politics, Sports, Entertainment'),
  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('summary')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Summary cannot exceed 500 characters')
];

const updateNewsValidation = [
  param('id').isMongoId().withMessage('Invalid article ID'),
  ...createNewsValidation
];

// GET /api/news - Get all published news articles
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isIn(['Technology', 'Politics', 'Sports', 'Entertainment']),
  query('search').optional().trim().isLength({ min: 1, max: 100 })
], validate, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  // Build query
  let query = { isPublished: true };
  
  if (req.query.category) {
    query.category = req.query.category;
  }
  
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }
  
  // Execute query
  const [articles, total] = await Promise.all([
    News.find(query)
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    News.countDocuments(query)
  ]);
  
  res.json({
    success: true,
    data: articles,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

// GET /api/news/:id - Get single news article
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid article ID')
], validate, asyncHandler(async (req, res) => {
  const article = await News.findById(req.params.id);
  
  if (!article || !article.isPublished) {
    return res.status(404).json({
      success: false,
      message: 'Article not found'
    });
  }
  
  // Increment views
  await article.incrementViews();
  
  res.json({
    success: true,
    data: article
  });
}));

// POST /api/news - Create new news article (Admin only)
// router.post('/', auth, requireAdmin, createNewsValidation, validate, asyncHandler(async (req, res) => {
//   const article = new News({
//     ...req.body,
//     author: req.body.author || req.admin.username
//   });
  
//   await article.save()
//   .catch(err)
//   {
//     console.log(err);
//   };
  
//   res.status(201).json({
//     success: true,
//     message: 'Article created successfully',
//     data: article
//   });
// }));
router.post('/', auth, requireAdmin,createNewsValidation,validate, asyncHandler(async (req, res) => {
  // console.log('Incoming create‐article payload:', req.body);
    const article = new News({
      ...req.body,
      author: req.body.author || req.admin.username
    });
  
    try {
      await article.save();
    } catch (err) {
      console.error('Error saving new article:', err);
      // return a 400 with the validation error messages
      return res.status(400).json({
        success: false,
        message: err.message,
        errors: err.errors  // if you want to surface Mongoose validation errors
      });
    }

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article
    });
  })
);


// PUT /api/news/:id - Update news article (Admin only)
router.put('/:id', auth, requireAdmin, updateNewsValidation, validate, asyncHandler(async (req, res) => {
  const article = await News.findById(req.params.id);
  
  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'Article not found'
    });
  }
  
  // Update article
  Object.assign(article, req.body);
  await article.save();
  
  res.json({
    success: true,
    message: 'Article updated successfully',
    data: article
  });
}));

// DELETE /api/news/:id - Delete news article (Admin only)
router.delete('/:id', auth, requireAdmin, [
  param('id').isMongoId().withMessage('Invalid article ID')
], validate, asyncHandler(async (req, res) => {
  const article = await News.findById(req.params.id);
  
  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'Article not found'
    });
  }
  
  await News.findByIdAndDelete(req.params.id);
  
  res.json({
    success: true,
    message: 'Article deleted successfully'
  });
}));

// GET /api/news/admin/all - Get all articles including unpublished (Admin only)
router.get('/admin/all', auth, requireAdmin, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], validate, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const [articles, total] = await Promise.all([
    News.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    News.countDocuments({})
  ]);
  
  res.json({
    success: true,
    data: articles,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
}));

export default router;