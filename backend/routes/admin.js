const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const db = require('../config/db');
const adminController = require('../controllers/adminController');

// USERS
router.get("/users", auth, adminController.listUsers);
router.put("/users/:id/role", auth, adminController.changeUserRole);
router.delete("/users/:id", auth, adminController.deleteUser);

// STATS
router.get("/stats", auth, adminController.getStats);

// PROJECTS
router.get("/projects", auth, adminController.listAllProjects);

module.exports = router;
