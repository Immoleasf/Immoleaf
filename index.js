// index.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// 1) Datenbank-Verbindung
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✔️ Mit MongoDB verbunden"))
  .catch((err) => {
    console.error("❌ MongoDB-Verbindungsfehler:", err);
    process.exit(1);
  });

// 2) Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve React build
app.use(express.static(path.join(__dirname, "frontend/build")));

// 3) API-Routen
// Hier holen wir uns den Router aus /api/index.js
app.use("/api", require("./api"));

// 4) Catch-all Route für das Frontend (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// 5) Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
