const express = require('express');
const connectDB = require('./db');
const User = require('./models/User'); // 🔹 Neu: User-Modell einbinden

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('✅ Hello from Immoleaf backend!');
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is alive ✅',
  });
});

// 🔹 Neue Route: User anlegen
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Connect to DB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
