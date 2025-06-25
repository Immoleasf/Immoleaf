require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// MongoDB verbinden
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('MongoDB Fehler:', err));

// Routen
const propertyRoutes = require('./routes/property');
app.use('/api/properties', propertyRoutes);

// Health Check
app.get('/', (req, res) => res.send('ImmoLeaf Backend läuft!'));

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
