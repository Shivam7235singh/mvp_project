const express = require("express");
const scoringController = require("../controllers/scoring-controller");

const router = express.Router();

router.post("/calculate", scoringController.calculateScore);

module.exports = router;
