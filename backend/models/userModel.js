// models/userModel.js
const db = require('../config/db');

async function createUser({ name, email, password, role = 'user' }) {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]
  );
  return { id: result.insertId, name, email, role };
}

async function findUserByEmail(email) {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await db.execute('SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function listUsers() {
  const [rows] = await db.execute('SELECT id, name, email, role, created_at FROM users');
  return rows;
}

module.exports = { createUser, findUserByEmail, findUserById, listUsers };
