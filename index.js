// index.js

// 1. Env-Variablen laden
require('dotenv').config();

// 2. Module importieren
const express = require('express');
const mongoose = require('mongoose');

// 3. Express-App anlegen
const app = express();

// 4. Body-Parsing (JSON)
app.use(express.json());

// 5. Mit MongoDB verbinden
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB verbunden'))
  .catch(err => {
    console.error('❌ MongoDB-Verbindung fehlgeschlagen:', err);
    process.exit(1);
  });

// 6. Beispiel-Route
app.get('/', (req, res) => {
  res.send('Hallo Immoleaf!');
});

// 7. Port konfigurieren und Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
