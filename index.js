const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const Company = require('./models/Company'); // Falls Company bereits definiert

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.send('✅ Hello from Immoleaf backend!');
});

// ✅ Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is alive ✅',
  });
});

// ✅ JSON API Übersicht
app.get('/api', (req, res) => {
  res.status(200).json({
    routes: {
      '/api': 'Übersicht der API-Endpunkte',
      '/api/health': 'Health check',
      '/api/users': {
        GET: 'Liste aller Benutzer',
        POST: 'Erstelle einen neuen Benutzer (name, email)',
      },
      '/api/docs': 'HTML Admin-Übersicht für APIs',
    },
  });
});

// ✅ HTML-Dokumentation
app.get('/api/docs', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Immoleaf API Übersicht</title>
        <style>
          body { font-family: sans-serif; line-height: 1.6; padding: 2rem; }
          h1 { color: #2b7cff; }
          code { background: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
          a { text-decoration: none; color: #2b7cff; }
        </style>
      </head>
      <body>
        <h1>📘 Immoleaf API Übersicht</h1>
        <ul>
          <li><a href="/api/health">/api/health</a> – Health check</li>
          <li><a href="/api/users">/api/users</a> – Benutzer abrufen (GET)</li>
          <li><code>POST /api/users</code> – Benutzer anlegen mit JSON { name, email }</li>
        </ul>
        <p>→ Diese Seite kann später durch Swagger, Redoc oder eine eigene Admin-Oberfläche ersetzt werden.</p>
      </body>
    </html>
  `);
});

// ✅ Benutzer anlegen
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name und E-Mail sind erforderlich' });
    }

    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Fehler beim Erstellen:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// ✅ Benutzer abrufen
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Fehler beim Abrufen:', err.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ Server starten nach erfolgreicher DB-Verbindung
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
