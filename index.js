const express = require('express');
const connectDB = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB verbinden
connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Immoleaf backend!');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
