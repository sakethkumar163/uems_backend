const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Secret key for JWT
const jwtSecret = 'jwt_secret_key';

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, password });

    if (user) {
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
      return res.status(201).json({ token });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login an existing user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
      return res.json({ token });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
