const express = require('express');
const connectDB = require('./db');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('✅ Hello from Immoleaf backend!');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString()
  });
});

// DB connection & Server start
connectDB().then(() => {
  console.log('🚀 Starting server...');
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('❌ Error starting server:', err.message);
});
