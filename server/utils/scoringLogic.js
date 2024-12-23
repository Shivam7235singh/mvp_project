/**
 * Scoring logic for different user activities or actions.
 */

// Base scoring configuration (adjust these weights based on your requirements)
const scoringWeights = {
    projectCompletion: 100,    // Points for completing a project
    milestoneAchieved: 50,     // Points for achieving a milestone
    dailyProgress: 10,         // Points for daily updates or progress
    bonus: 20,                 // Additional points for special achievements
  };
  
  /**
   * Calculate score based on project completion percentage.
   * @param {number} progressPercentage - The progress percentage of a project.
   * @returns {number} - Calculated score.
   */
  const calculateProgressScore = (progressPercentage) => {
    if (progressPercentage >= 100) {
      return scoringWeights.projectCompletion;
    }
    return Math.floor((scoringWeights.projectCompletion * progressPercentage) / 100);
  };
  
  /**
   * Calculate score for achieving a milestone.
   * @param {boolean} isMilestoneAchieved - Indicates if a milestone is achieved.
   * @returns {number} - Milestone score.
   */
  const calculateMilestoneScore = (isMilestoneAchieved) => {
    return isMilestoneAchieved ? scoringWeights.milestoneAchieved : 0;
  };
  
  /**
   * Calculate daily progress score.
   * @param {number} updates - Number of daily updates provided.
   * @returns {number} - Daily progress score.
   */
  const calculateDailyProgressScore = (updates) => {
    return updates * scoringWeights.dailyProgress;
  };
  
  /**
   * Calculate bonus score for special achievements.
   * @param {boolean} isBonusEligible - Indicates if eligible for a bonus.
   * @returns {number} - Bonus score.
   */
  const calculateBonusScore = (isBonusEligible) => {
    return isBonusEligible ? scoringWeights.bonus : 0;
  };
  
  /**
   * Calculate the total score based on various factors.
   * @param {object} params - Scoring parameters.
   * @param {number} params.progressPercentage - The progress percentage of a project.
   * @param {boolean} params.isMilestoneAchieved - Indicates if a milestone is achieved.
   * @param {number} params.dailyUpdates - Number of daily updates provided.
   * @param {boolean} params.isBonusEligible - Indicates if eligible for a bonus.
   * @returns {number} - Total calculated score.
   */
  const calculateTotalScore = ({ 
    progressPercentage, 
    isMilestoneAchieved, 
    dailyUpdates, 
    isBonusEligible 
  }) => {
    const progressScore = calculateProgressScore(progressPercentage);
    const milestoneScore = calculateMilestoneScore(isMilestoneAchieved);
    const dailyProgressScore = calculateDailyProgressScore(dailyUpdates);
    const bonusScore = calculateBonusScore(isBonusEligible);
  
    return progressScore + milestoneScore + dailyProgressScore + bonusScore;
  };
  
  // Exporting scoring functions
  module.exports = {
    calculateProgressScore,
    calculateMilestoneScore,
    calculateDailyProgressScore,
    calculateBonusScore,
    calculateTotalScore,
  };
  