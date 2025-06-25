const express = require('express');
const connectDB = require('./db');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is alive ✅' });
});

// Default route
app.get('/', (req, res) => {
  res.send('✅ Hello from Immoleaf backend!');
});

// DB connection & Server start
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
