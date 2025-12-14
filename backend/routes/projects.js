// routes/projects.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/auth');
const { validateProject } = require('../middlewares/validate');

// list & create
router.get('/', auth, projectController.listProjects);
router.post('/', auth, validateProject, projectController.createProject);

// single project
router.get('/:id', auth, projectController.getProject);
router.put('/:id', auth, validateProject, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
