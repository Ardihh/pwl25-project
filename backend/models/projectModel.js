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
  // build minimal update
  const fields = [];
  const values = [];
  for (const key of ['title','description','budget','deadline','status']) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }
  if (!fields.length) return getProjectById(id);
  values.push(id);
  await db.execute(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, values);
  return getProjectById(id);
}

async function deleteProject(id) {
  const [result] = await db.query(
    "DELETE FROM projects WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

async function listProjects({ userId, isAdmin }) {
  let sql = `
    SELECT 
      p.id,
      p.title,
      p.description,
      p.status,
      p.deadline,
      p.user_id,
      u.name AS owner_name
    FROM projects p
    JOIN users u ON p.user_id = u.id
  `;

  const params = [];

  if (!isAdmin) {
    sql += " WHERE p.user_id = ?";
    params.push(userId);
  }

  sql += " ORDER BY p.created_at DESC";

  const [rows] = await db.execute(sql, params);
  return rows;
}

module.exports = { createProject, getProjectById, updateProject, deleteProject, listProjects };
