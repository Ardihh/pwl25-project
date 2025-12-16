const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const db = require('../config/db');

router.get('/stats', auth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Forbidden' });

    const [[projects]] = await db.execute(
      'SELECT COUNT(*) total FROM projects'
    );

    const [[tasks]] = await db.execute(
      'SELECT COUNT(*) total FROM tasks'
    );

    const [status] = await db.execute(`
      SELECT status, COUNT(*) total
      FROM projects
      GROUP BY status
    `);

    res.json({
      totalProjects: projects.total,
      totalTasks: tasks.total,
      status
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
