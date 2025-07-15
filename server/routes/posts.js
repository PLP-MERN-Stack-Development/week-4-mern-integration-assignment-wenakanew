const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const Category = require('../models/Category');
const router = express.Router();

// @route   GET /api/posts
// @desc    Get all blog posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category').populate('author', '-password');
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/posts/:id
// @desc    Get a specific blog post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category').populate('author', '-password');
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/posts
// @desc    Create a new blog post
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, content, category, author, featuredImage, excerpt, tags, isPublished } = req.body;
      const post = new Post({
        title,
        content,
        category,
        author,
        featuredImage,
        excerpt,
        tags,
        isPublished,
      });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }
);

// @route   PUT /api/posts/:id
// @desc    Update an existing blog post
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('author').optional().notEmpty().withMessage('Author cannot be empty'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      next(err);
    }
  }
);

// @route   DELETE /api/posts/:id
// @desc    Delete a blog post
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router; 