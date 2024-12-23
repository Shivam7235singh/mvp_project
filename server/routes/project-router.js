const express = require("express");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController"); // Adjust this path relative to your project structure
 // Adjust path if necessary

// Routes


router.post("/projects", createProject);
router.get("/projects", getAllProjects);
router.get("/projects/:projectId", getProjectById);
router.put("/projects/:projectId", updateProject);
router.delete("/projects/:projectId", deleteProject);

module.exports = router;
