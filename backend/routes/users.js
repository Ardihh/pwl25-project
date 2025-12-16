const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userModel = require('../models/userModel');

// =======================
// ADMIN: LIST ALL USERS
// =======================
router.get('/', auth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const users = await userModel.listUsers();
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

// =======================
// ADMIN / SELF: USER DETAIL
// =======================
router.get('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id != id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const user = await userModel.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
