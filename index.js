const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001; // Updated to use port 3001

app.use(cors()); // Optional, for cross-origin requests
app.use(bodyParser.json());

app.post("/update", async (req, res) => {
  const data = req.body;

  console.log("📥 Received data:", data);

  // Firebase Realtime Database endpoint
  const firebaseUrl =
    "https://line-monitoring-wifi-default-rtdb.asia-southeast1.firebasedatabase.app/joint_001.json?auth=d5BP6y6n0MEvJM1BdxMmhGepb5zlfVGWz5I63eFs";

  try {
    const firebaseResponse = await axios.put(firebaseUrl, data);
    console.log("✅ Data successfully forwarded to Firebase.");
    res.status(200).send("✅ Data forwarded to Firebase.");
  } catch (error) {
    console.error("❌ Firebase error:", error.response?.data || error.message);
    res.status(500).send("❌ Failed to forward data to Firebase.");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Middleware is up and running on port 3001.");
});

app.listen(port, () => {
  console.log(`🚀 Middleware server listening on port ${port}`);
});
