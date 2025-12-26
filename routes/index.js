const express = require("express");
const mainRoutes = require("./v1/mainRoutes");
const goldRoutes = require("./v1/goldRoutes");
const healthRoutes = require("./v1/healthRoutes");
const loveRoutes = require("./v1/loveRoutes");

const router = express.Router();

router.use("/", mainRoutes);
router.use("/", goldRoutes);
router.use("/", healthRoutes);
router.use("/", loveRoutes);

module.exports = router;
