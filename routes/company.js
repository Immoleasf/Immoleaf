const express = require('express');
const Company = require('../models/Company');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Liste aller Firmen für den angemeldeten Mandanten
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Erfolgreich geladen
 *   post:
 *     summary: Neue Firma registrieren
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       201:
 *         description: Firma erstellt
 */

// 🔒 GET: Alle Firmen des aktuellen Tenants
router.get('/', auth, async (req, res) => {
  try {
    const companies = await Company.find({ tenantId: req.user.tenantId }).sort({ createdAt: -1 });
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Laden der Firmen' });
  }
});

// 🔒 POST: Neue Firma für den aktuellen Tenant anlegen
router.post('/', auth, async (req, res) => {
  try {
    const { name, industry } = req.body;
    if (!name) return res.status(400).json({ error: 'Name ist erforderlich' });

    const exists = await Company.findOne({ name, tenantId: req.user.tenantId });
    if (exists) return res.status(400).json({ error: 'Firma existiert bereits' });

    const company = new Company({
      name,
      industry,
      tenantId: req.user.tenantId,
    });

    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
