const express = require("express");
const goldController = require("../../controllers/goldController");

const router = express.Router();

router.get("/gold-price", goldController.getGoldPrice);

module.exports = router;
