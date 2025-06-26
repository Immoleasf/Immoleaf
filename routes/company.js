const express = require('express');
const Company = require('../models/Company');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Liste aller Firmen (auth erforderlich)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Erfolgreich geladen
 *   post:
 *     summary: Neue Firma registrieren
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               industry:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Firma erstellt
 */

// 🔒 Auth für beide
router.get('/', auth, async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Laden der Firmen' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, industry, location } = req.body;
    const exists = await Company.findOne({ name });
    if (exists) return res.status(400).json({ error: 'Firma existiert bereits' });

    const company = new Company({ name, industry, location });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
