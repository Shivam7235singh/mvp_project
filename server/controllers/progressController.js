const scoringLogic = require("../utils/scoringLogic");
const Progress = require("../models/Progress");
const Project = require("../models/Project"); // Import Project model to verify project existence

// Handle progress and calculate score
const handleProgress = async (req, res) => {
  try {
    const { progressPercentage, isMilestoneAchieved, dailyUpdates, isBonusEligible } = req.body;

    // Calculate the total score using scoring logic
    const score = scoringLogic.calculateTotalScore({
      progressPercentage,
      isMilestoneAchieved,
      dailyUpdates,
      isBonusEligible,
    });

    res.status(200).json({ message: "Progress score calculated", score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while calculating score" });
  }
};

// Create a new progress update
const createProgressUpdate = async (req, res) => {
  try {
    const { project, progressPercentage, updateDescription } = req.body;

    // Check if the project exists
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create the progress update
    const newProgress = new Progress({
      project,
      progressPercentage,
      updateDescription,
    });

    // Save the progress update to the database
    await newProgress.save();

    res.status(201).json({
      message: "Progress update created successfully",
      progress: newProgress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating progress update" });
  }
};

// Get all progress updates for a project
const getProgressUpdatesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find progress updates for the specified project
    const progressUpdates = await Progress.find({ project: projectId }).populate("project", "name description");

    if (!progressUpdates.length) {
      return res.status(404).json({ message: "No progress updates found for the specified project" });
    }

    res.status(200).json({ progressUpdates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching progress updates" });
  }
};

// Get a single progress update by ID
const getProgressUpdateById = async (req, res) => {
  try {
    const { progressId } = req.params;

    const progress = await Progress.findById(progressId).populate("project", "name description");

    if (!progress) {
      return res.status(404).json({ message: "Progress update not found" });
    }

    res.status(200).json({ progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching progress update" });
  }
};

// Update a progress update by ID
const updateProgressUpdate = async (req, res) => {
  try {
    const { progressId } = req.params;
    const { progressPercentage, updateDescription } = req.body;

    const updatedProgress = await Progress.findByIdAndUpdate(
      progressId,
      { progressPercentage, updateDescription },
      { new: true }
    ).populate("project", "name description");

    if (!updatedProgress) {
      return res.status(404).json({ message: "Progress update not found" });
    }

    res.status(200).json({
      message: "Progress update updated successfully",
      progress: updatedProgress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating progress update" });
  }
};

// Delete a progress update by ID
const deleteProgressUpdate = async (req, res) => {
  try {
    const { progressId } = req.params;

    const deletedProgress = await Progress.findByIdAndDelete(progressId);

    if (!deletedProgress) {
      return res.status(404).json({ message: "Progress update not found" });
    }

    res.status(200).json({ message: "Progress update deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting progress update" });
  }
};

module.exports = {
  handleProgress, // Scoring logic endpoint
  createProgressUpdate,
  getProgressUpdatesByProject,
  getProgressUpdateById,
  updateProgressUpdate,
  deleteProgressUpdate,
};
