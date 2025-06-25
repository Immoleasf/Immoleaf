const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'immoleaf-secret';

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Kein Token übergeben' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, email, tenantId }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Ungültiger Token' });
  }
};

module.exports = auth;
