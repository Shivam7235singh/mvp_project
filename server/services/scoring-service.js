const scoringLogic = require("../utils/scoringLogic");

const calculateScore = (progressData) => {
  return scoringLogic.calculateTotalScore(progressData);
};

module.exports = { calculateScore };
