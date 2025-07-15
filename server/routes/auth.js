const express = require('express');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', (req, res) => {
  res.send('Register a new user');
});

// @route   POST /api/auth/login
// @desc    Login a user
router.post('/login', (req, res) => {
  res.send('Login a user');
});

module.exports = router; 