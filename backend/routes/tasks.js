// routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');
const { validateTask } = require('../middlewares/validate');

// tasks under project
router.get('/project/:projectId', auth, taskController.listTasks);
router.post('/project/:projectId', auth, validateTask, taskController.createTask);

// direct task routes
router.get('/:id', auth, taskController.getTask);
router.put('/:id', auth, validateTask, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
