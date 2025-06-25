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

// Übersicht aller API-Routen (JSON)
app.get('/api', (req, res) => {
  res.status(200).json({
    routes: {
      '/api': 'Übersicht der API-Endpunkte',
      '/api/health': 'Health check',
      '/api/users': {
        GET: 'Liste aller Benutzer',
        POST: 'Erstelle einen neuen Benutzer (name, email, tenantId)',
      },
      '/api/docs': 'Schöne HTML-Doku und Testformular',
    },
  });
});

// Neuen User erstellen
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, tenantId } = req.body;
    const user = new User({ name, email, tenantId });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Alle User abrufen
app.get('/api/users', async (req, res) => {
  try {
    const filter = req.query.tenantId ? { tenantId: req.query.tenantId } : {};
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// 📘 HTML-Doku + Formular
app.get('/api/docs', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8" />
      <title>Immoleaf API Übersicht</title>
      <style>
        body { font-family: sans-serif; padding: 2rem; max-width: 700px; margin: auto; }
        h1 { color: #2e7d32; }
        code { background: #eee; padding: 2px 4px; border-radius: 4px; }
        .route { margin-bottom: 1rem; }
        label, input { display: block; margin-top: 0.5rem; }
        input, button { padding: 0.5rem; width: 100%; }
        button { margin-top: 1rem; background: #2e7d32; color: white; border: none; cursor: pointer; }
        .result { margin-top: 1rem; background: #f1f8e9; padding: 1rem; border: 1px solid #c5e1a5; white-space: pre-wrap; }
      </style>
    </head>
    <body>
      <h1>📘 Immoleaf API Übersicht</h1>

      <div class="route"><code>GET /api</code> – Übersicht dieser API</div>
      <div class="route"><code>GET /api/health</code> – Health Check</div>
      <div class="route"><code>GET /api/users?tenantId=xyz</code> – Benutzerliste</div>
      <div class="route"><code>POST /api/users</code> – Benutzer anlegen</div>

      <h2>👤 Benutzer anlegen (Test)</h2>
      <form id="userForm">
        <label>Name: <input name="name" required /></label>
        <label>Email: <input name="email" required /></label>
        <label>Tenant ID: <input name="tenantId" required /></label>
        <button type="submit">Benutzer erstellen</button>
      </form>

      <div id="result" class="result" style="display:none;"></div>

      <script>
        const form = document.getElementById('userForm');
        const result = document.getElementById('result');

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(form));
          try {
            const res = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            const json = await res.json();
            result.style.display = 'block';
            result.textContent = JSON.stringify(json, null, 2);
          } catch (err) {
            result.style.display = 'block';
            result.textContent = '❌ Fehler beim Senden';
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Starte Server nach erfolgreicher DB-Verbindung
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
