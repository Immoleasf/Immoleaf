const express = require('express');
const connectDB = require('./db');

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

// Connect to DB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
