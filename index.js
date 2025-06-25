const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const Company = require('./models/Company'); // Falls vorhanden

// 🔹 Swagger Setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// 🔹 Swagger Definition
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Immoleaf API',
      version: '1.0.0',
      description: 'CRM Backend API für Immoleaf',
    },
    servers: [
      {
        url: 'https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net',
      },
    ],
  },
  apis: ['./index.js'], // Nur index.js kommentiert
});

// ✅ Swagger UI unter /api/swagger und /api/docs
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Alle Benutzer abrufen
 *     responses:
 *       200:
 *         description: Liste aller Benutzer
 *   post:
 *     summary: Benutzer anlegen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Benutzer erfolgreich erstellt
 */

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
      '/api/swagger': 'Swagger UI (API-Dokumentation)',
      '/api/docs': 'Swagger UI (API-Dokumentation)',
    },
  });
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

// ✅ Server starten
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
