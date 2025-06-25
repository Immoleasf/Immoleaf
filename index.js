const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const Company = require('./models/Company'); // Optional
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth');

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
      description: 'CRM Backend API für Immoleaf mit Authentifizierung',
    },
    servers: [
      {
        url: 'https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net',
      },
    ],
  },
  apis: ['./index.js'],
});

// ✅ Swagger UI
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Alle Benutzer abrufen (auth erforderlich)
 *     security:
 *       - bearerAuth: []
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

// ✅ Root
app.get('/', (req, res) => {
  res.send('✅ Hello from Immoleaf backend!');
});

// ✅ Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is alive ✅' });
});

// ✅ JSON API Übersicht
app.get('/api', (req, res) => {
  res.status(200).json({
    routes: {
      '/api': 'Übersicht der API-Endpunkte',
      '/api/health': 'Health check',
      '/api/users': {
        GET: 'Liste aller Benutzer (auth erforderlich)',
        POST: 'Erstelle neuen Benutzer (name, email)',
      },
      '/api/auth/register': 'Benutzer registrieren',
      '/api/auth/login': 'Login mit JWT-Token',
      '/api/swagger': 'Swagger UI',
      '/api/docs': 'Swagger UI',
    },
  });
});

// ✅ Auth-Routen einbinden
app.use('/api/auth', authRoutes);

// ✅ Benutzer anlegen (öffentlich)
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name und E-Mail sind erforderlich' });
    }
    const user = new User({ name, email, tenantId: 'demo' });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Benutzer abrufen (auth erforderlich)
app.get('/api/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ tenantId: req.user.tenantId }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ Server starten
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
