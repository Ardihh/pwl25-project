// models/projectModel.js
const db = require('../config/db');

async function createProject({ user_id, title, description, budget, deadline, status }) {
  const [result] = await db.execute(
    `INSERT INTO projects (user_id, title, description, budget, deadline, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, title, description || null, budget || 0, deadline || null, status || 'planning']
  );
  return getProjectById(result.insertId);
}

async function getProjectById(id) {
  const [rows] = await db.execute(`
    SELECT 
      p.*,
      u.name AS owner_name
    FROM projects p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `, [id]);

  return rows[0];
}

async function updateProject(id, data) {
  const { title, description, budget, deadline, status } = data;
  const query = `
    UPDATE projects 
    SET title = ?, description = ?, budget = ?, deadline = ?, status = ? 
    WHERE id = ?
  `;
  await db.execute(query, [title, description, budget, deadline, status, id]);
}

async function deleteProject(id) {
  const [result] = await db.query(
    "DELETE FROM projects WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

async function listProjects({ isAdmin, userId }) {
  let query = `
    SELECT 
      p.id, 
      p.title, 
      p.description, 
      p.budget,  /* <--- PASTIKAN ADA INI */
      p.deadline, 
      p.status, 
      u.name as owner_name 
    FROM projects p
    JOIN users u ON p.user_id = u.id
  `;

  if (!isAdmin) {
    query += ` WHERE p.user_id = ${userId}`;
  }

  const [rows] = await db.execute(query);
  return rows;
}

module.exports = { createProject, getProjectById, updateProject, deleteProject, listProjects };
