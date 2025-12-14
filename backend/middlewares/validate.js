// middlewares/validate.js

function validateProject(req, res, next) {
  const { title, budget, deadline } = req.body;
  if (req.method === 'POST' && !title) return res.status(400).json({ message: 'title is required' });
  // optional: check budget is number, deadline is valid date
  next();
}

function validateTask(req, res, next) {
  const { title, priority } = req.body;
  if (req.method === 'POST' && !title) return res.status(400).json({ message: 'title is required' });
  if (priority !== undefined) {
    const p = parseInt(priority, 10);
    if (isNaN(p) || p < 1 || p > 5) return res.status(400).json({ message: 'priority must be 1-5' });
  }
  next();
}

module.exports = { validateProject, validateTask };
