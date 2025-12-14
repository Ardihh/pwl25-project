// models/taskModel.js
const db = require('../config/db');

async function createTask({ project_id, title, detail, priority, due_date, status, assignee_id }) {
  const [result] = await db.execute(
    `INSERT INTO tasks (project_id, title, detail, priority, due_date, status, assignee_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [project_id, title, detail || null, priority || 3, due_date || null, status || 'todo', assignee_id || null]
  );
  return getTaskById(result.insertId);
}

async function getTaskById(id) {
  const [rows] = await db.execute(
    `SELECT t.*, p.title as project_title, u.name as assignee_name, u.email as assignee_email
     FROM tasks t
     JOIN projects p ON t.project_id = p.id
     LEFT JOIN users u ON t.assignee_id = u.id
     WHERE t.id = ?`, [id]
  );
  return rows[0];
}

async function updateTask(id, data) {
  const fields = [];
  const values = [];
  for (const key of ['title','detail','priority','due_date','status','assignee_id']) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }
  if (!fields.length) return getTaskById(id);
  values.push(id);
  await db.execute(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`, values);
  return getTaskById(id);
}

async function deleteTask(id) {
  const [res] = await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return res.affectedRows > 0;
}

async function listTasksByProject(projectId) {
  const [rows] = await db.execute('SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC', [projectId]);
  return rows;
}

module.exports = { createTask, getTaskById, updateTask, deleteTask, listTasksByProject };
