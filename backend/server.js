require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

// health
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: 'pong' });
});

// error handler
app.use(require('./middlewares/errorHandler').errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
