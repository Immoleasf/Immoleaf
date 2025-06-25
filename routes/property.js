const express = require('express');
const Property = require('../models/property');
const router = express.Router();

// Alle Immobilien abrufen
router.get('/', async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// Einzelne Immobilie abrufen
router.get('/:id', async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).send('Nicht gefunden');
  res.json(property);
});

// Neue Immobilie anlegen
router.post('/', async (req, res) => {
  const property = new Property(req.body);
  await property.save();
  res.status(201).json(property);
});

// Immobilie aktualisieren
router.put('/:id', async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(property);
});

// Immobilie löschen
router.delete('/:id', async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;

