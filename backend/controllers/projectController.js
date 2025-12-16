// controllers/projectController.js
const projectModel = require('../models/projectModel');

async function createProject(req, res, next) {
  try {
    const user_id = req.user.id;
    const { title, description, budget, deadline, status } = req.body;
    if (!title) return res.status(400).json({ message: 'title required' });
    const project = await projectModel.createProject({ user_id, title, description, budget, deadline, status });
    res.status(201).json({ message: 'Project created', project });
  } catch (err) { next(err); }
}

async function listProjects(req, res, next) {
  try {
    const isAdmin = req.user.role === "admin";
    const projects = await projectModel.listProjects({
      userId: isAdmin ? null : req.user.id,
      isAdmin
    });

    res.json({ projects });
  } catch (err) {
    next(err);
  }
}

async function getProject(req, res, next) {
  try {
    const project = await projectModel.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // user biasa hanya boleh lihat project sendiri
    if (req.user.role !== 'admin' && project.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json({ project });
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const id = req.params.id;
    const project = await projectModel.getProjectById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    // only owner or admin
    if (req.user.role !== 'admin' && project.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const updated = await projectModel.updateProject(id, req.body);
    res.json({ message: 'Project updated', project: updated });
  } catch (err) { next(err); }
}

async function deleteProject(req, res, next) {
  try {
    const id = req.params.id;
    const project = await projectModel.getProjectById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (req.user.role !== 'admin' && project.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const ok = await projectModel.deleteProject(id);
    res.json({ message: ok ? 'Project deleted' : 'Failed to delete' });
  } catch (err) { next(err); }
}

module.exports = { createProject, listProjects, getProject, updateProject, deleteProject };
