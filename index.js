const express = require('express');
const path = require('path');
const connectDB = require('./db');
const User = require('./models/User');
const Company = require('./models/Company');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static HTML
app.get('/', (req, res) => {
  res.send(`
    <h1>✅ Immoleaf Backend</h1>
    <p><a href="/api">API Übersicht anzeigen</a></p>
    <hr />
    <h2>Testfirma anlegen</h2>
    <form method="POST" action="/api/companies">
      <label>Tenant ID:</label><br />
      <input name="tenantId" required /><br />
      <label>Firmenname:</label><br />
      <input name="name" required /><br />
      <label>Branche:</label><br />
      <input name="industry" /><br />
      <button type="submit">Absenden</button>
    </form>
  `);
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is alive ✅' });
});

// API Übersicht
app.get('/api', (req, res) => {
  res.status(200).json({
    routes: {
      '/api': 'Übersicht der API-Endpunkte',
      '/api/health': 'Health check',
      '/api/users': {
        GET: 'Liste aller Benutzer',
        POST: 'Neuen Benutzer anlegen (name, email)'
      },
      '/api/companies': {
        GET: 'Liste aller Firmen (Query: tenantId)',
        POST: 'Firma anlegen (name, industry, tenantId)'
      }
    }
  });
});

// Users
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

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Companies
app.post('/api/companies', async (req, res) => {
  try {
    const { name, industry, tenantId } = req.body;
    const company = new Company({ name, industry, tenantId });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/companies', async (req, res) => {
  try {
    const { tenantId } = req.query;
    if (!tenantId) return res.status(400).json({ error: 'tenantId ist erforderlich' });

    const companies = await Company.find({ tenantId }).sort({ createdAt: -1 });
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Laden der Firmen' });
  }
});

// Starte Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
