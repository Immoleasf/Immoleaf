const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('✅ Hello from Immoleaf backend!');
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is alive ✅',
  });
});

// API Übersicht
app.get('/api', (req, res) => {
  res.status(200).json({
    routes: {
      '/api': 'Übersicht der API-Endpunkte',
      '/api/health': 'Health check',
      '/api/users': {
        GET: 'Liste aller Benutzer für einen Mandanten (Query: tenantId)',
        POST: 'Erstelle einen Benutzer (name, email, tenantId)',
      },
    },
  });
});

// Benutzer erstellen
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, tenantId } = req.body;

    if (!tenantId) {
      return res.status(400).json({ error: 'tenantId ist erforderlich' });
    }

    const user = new User({ name, email, tenantId });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Benutzer abrufen (nach tenantId)
app.get('/api/users', async (req, res) => {
  const { tenantId } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: 'tenantId Query-Parameter ist erforderlich' });
  }

  try {
    const users = await User.find({ tenantId }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// DB verbinden und Server starten
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
