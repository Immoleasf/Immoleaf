const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'immoleaf-secret';

// 🟢 Registrierung
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

// 🟢 Login
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
