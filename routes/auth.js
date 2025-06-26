const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'immoleaf-secret';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registriert einen neuen Benutzer
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - tenantId
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               tenantId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Benutzer erfolgreich registriert
 *       400:
 *         description: Fehlerhafte Eingabe
 *       500:
 *         description: Registrierung fehlgeschlagen
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, tenantId } = req.body;
    if (!name || !email || !password || !tenantId) {
      return res.status(400).json({ error: 'Alle Felder sind erforderlich' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Benutzer existiert bereits' });

    const hashedPw = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPw, tenantId });
    await user.save();

    res.status(201).json({ message: 'Benutzer erstellt' });
  } catch (err) {
    res.status(500).json({ error: 'Registrierung fehlgeschlagen' });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login mit E-Mail und Passwort
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Erfolgreich eingeloggt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Ungültige Zugangsdaten
 *       500:
 *         description: Login fehlgeschlagen
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Ungültige Zugangsdaten' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Ungültiges Passwort' });

    const token = jwt.sign(
      { userId: user._id, email: user.email, tenantId: user.tenantId },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login fehlgeschlagen' });
  }
});

module.exports = router;
