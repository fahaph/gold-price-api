const express = require("express");
const cors = require("cors");
const { getGoldPrice } = require("./scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Add cache-control to prevent browser caching for real-time feel
app.use((req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/api/gold-price", async (req, res) => {
  try {
    const priceData = await getGoldPrice();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: priceData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch gold prices",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`API Gold Price: http://localhost:${PORT}/api/gold-price`);
});
