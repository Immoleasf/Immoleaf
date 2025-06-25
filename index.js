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


app.get("/check-db", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      status: "✅ Connected to DB",
      collections: collections.map((c) => c.name),
    });
  } catch (err) {
    res.status(500).json({ status: "❌ Error", message: err.message });
  }
});
