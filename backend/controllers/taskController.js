// controllers/taskController.js
const taskModel = require('../models/taskModel');
const projectModel = require('../models/projectModel');

async function createTask(req, res, next) {
  try {
    const projectId = req.params.projectId;
    const project = await projectModel.getProjectById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    // only owner or admin can create tasks in project
    if (req.user.role !== 'admin' && project.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, detail, priority, due_date, status, assignee_id } = req.body;
    if (!title) return res.status(400).json({ message: 'title required' });

    const task = await taskModel.createTask({
      project_id: projectId,
      title, detail, priority, due_date, status, assignee_id
    });
    res.status(201).json({ message: 'Task created', task });
  } catch (err) { next(err); }
}

async function listTasks(req, res, next) {
  try {
    const projectId = req.params.projectId;
    const project = await projectModel.getProjectById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    // anyone authenticated can view tasks (or you can restrict)
    const tasks = await taskModel.listTasksByProject(projectId);
    res.json({ tasks });
  } catch (err) { next(err); }
}

async function getTask(req, res, next) {
  try {
    const id = req.params.id;
    const task = await taskModel.getTaskById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ task });
  } catch (err) { next(err); }
}

async function updateTask(req, res, next) {
  try {
    const id = req.params.id;
    const task = await taskModel.getTaskById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // load project to check permission
    const project = await projectModel.getProjectById(task.project_id);
    if (req.user.role !== 'admin' && project.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const updated = await taskModel.updateTask(id, req.body);
    res.json({ message: 'Task updated', task: updated });
  } catch (err) { next(err); }
}

async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;
    const task = await taskModel.getTaskById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const project = await projectModel.getProjectById(task.project_id);
    if (req.user.role !== 'admin' && project.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const ok = await taskModel.deleteTask(id);
    res.json({ message: ok ? 'Task deleted' : 'Failed to delete' });
  } catch (err) { next(err); }
}

module.exports = { createTask, listTasks, getTask, updateTask, deleteTask };
