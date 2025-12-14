// utils/jwt.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secret';
const EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { sign, verify };
