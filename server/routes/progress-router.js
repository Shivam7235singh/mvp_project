const express = require("express");
const router = express.Router();
const {
  createProgressUpdate,
  getProgressUpdatesByProject,
  getProgressUpdateById,
  updateProgressUpdate,
  deleteProgressUpdate,
} = require("../controllers/progressController"); // Adjust path if necessary

// Routes
router.post("/progress", createProgressUpdate);
router.get("/progress/:projectId", getProgressUpdatesByProject); // Get all progress updates for a specific project
router.get("/progress/:progressId", getProgressUpdateById); // Get a specific progress update by ID
router.put("/progress/:progressId", updateProgressUpdate); // Update progress update
router.delete("/progress/:progressId", deleteProgressUpdate); // Delete progress update

module.exports = router;
