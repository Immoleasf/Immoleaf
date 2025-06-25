// api/index.js
const router = require("express").Router();

// Beispiel: Auth-Routen
const authRoutes = require("./routes/auth");
// Weitere Routen, z.B.:
// const propertyRoutes = require("./routes/property");

router.use("/auth", authRoutes);
// router.use("/properties", propertyRoutes);

module.exports = router;
