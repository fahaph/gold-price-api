const express = require("express");
const goldRoutes = require("./v1/goldRoutes");
const healthRoutes = require("./v1/healthRoutes");

const router = express.Router();

router.use("/v1", goldRoutes);
router.use("/v1", healthRoutes);

// Fallback for non-versioned routes (optional, for backward compatibility if needed)
router.use("/", goldRoutes);
router.use("/", healthRoutes);

module.exports = router;
