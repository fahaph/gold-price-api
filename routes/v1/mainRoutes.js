const express = require("express");
const mainController = require("../../controllers/mainController");

const router = express.Router();

router.get("/", mainController.getApiInfo.bind(mainController));

module.exports = router;
