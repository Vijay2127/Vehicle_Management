

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
  // Validate request body
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ 
      success: false,
      message: 'Username and password are required' 
    });
  }

  const { username, password } = req.body;

  try {
    // 1. Find user with case-insensitive search
    const user = await User.findOne({ 
      username: { $regex: new RegExp(username, 'i') } 
    }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication failed' 
      });
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed'
      });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '48h' }
    );

    // 4. Send response
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};