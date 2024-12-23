const scoringService = require("../services/scoring-service");

const calculateScore = (req, res) => {
  try {
    const score = scoringService.calculateScore(req.body);
    res.status(200).json({ message: "Score calculated", score });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = { calculateScore };
