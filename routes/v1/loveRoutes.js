const express = require("express");
const loveController = require("../../controllers/loveController");

const router = express.Router();

router.get("/love", loveController.getMessage.bind(loveController));

module.exports = router;
