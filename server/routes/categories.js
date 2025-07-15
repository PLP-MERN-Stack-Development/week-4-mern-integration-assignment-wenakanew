const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/categories
// @desc    Create a new category
router.post(
  '/',
  body('name').notEmpty().withMessage('Name is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name } = req.body;
      const category = new Category({ name });
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate category name
        return res.status(400).json({ errors: [{ msg: 'Category already exists' }] });
      }
      next(err);
    }
  }
);

module.exports = router; 