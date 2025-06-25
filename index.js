import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ Connected to Cosmos MongoDB"))
  .catch((err) => console.error("❌ DB connection error:", err));

app.get("/", (req, res) => {
  res.send("👋 Hello from Immoleaf Backend with MongoDB!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
