// middlewares/auth.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = header.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const payload = jwt.verify(token, JWT_SECRET);

    const user = await userModel.findUserById(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: payload.id,
      role: payload.role,
      name: payload.name
    };
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    });
  }
}

module.exports = auth;
