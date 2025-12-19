const db = require("../config/db");
const userModel = require("../models/userModel");
const projectModel = require("../models/projectModel");

exports.getStats = async (req, res) => {
  try {
    const [[{ totalUsers }]] = await db.execute('SELECT COUNT(*) as totalUsers FROM users');
    const [[{ totalProjects }]] = await db.execute('SELECT COUNT(*) as totalProjects FROM projects');
    const [[{ totalTasks }]] = await db.execute('SELECT COUNT(*) as totalTasks FROM tasks');
    
    const [[{ totalBudget }]] = await db.execute('SELECT COALESCE(SUM(budget), 0) as totalBudget FROM projects');

    res.json({
      totalUsers,
      totalProjects,
      totalTasks,
      totalBudget: parseFloat(totalBudget) 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listAllProjects = async (req, res) => {
  const projects = await projectModel.listProjects({ isAdmin: true });
  res.json({ projects });
};

exports.getProjectDetail = async (req, res) => {
  const project = await projectModel.getProjectById(req.params.id);
  res.json({ project });
};

exports.listUsers = async (req, res) => {
  const users = await userModel.listUsersWithProjectCount();
  res.json({ users });
};

exports.changeUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  await userModel.updateRole(id, role);
  res.json({ message: "Role updated" });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (id == req.user.id) {
    return res.status(400).json({ message: "Cannot delete yourself" });
  }

  await userModel.deleteUser(id);
  res.json({ message: "User deleted" });
};

