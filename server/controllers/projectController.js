const Project = require("../models/Project"); // Adjust path if necessary
const User = require("../models/user-model"); // Ensure this is imported

// Create a new project
const createProject = async (req, res) => {
    console.log("Project route loaded successfully");

    try {
      const { name, description, startDate, endDate, status, teamMembers } = req.body;
     
      // Validate required fields
      if (!name || !description || !startDate || !endDate) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Validate dates
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
        return res
          .status(400)
          .json({ message: "Invalid startDate or endDate. Ensure startDate is before endDate." });
      }
  
      // Validate teamMembers (if provided)
      if (teamMembers && !Array.isArray(teamMembers)) {
        return res.status(400).json({ message: "teamMembers must be an array of IDs" });
      }
  
      if (teamMembers && teamMembers.length > 0) {
        const validUsers = await User.find({ _id: { $in: teamMembers } });
        if (validUsers.length !== teamMembers.length) {
          return res.status(400).json({ message: "Some team member IDs are invalid" });
        }
      }
  
      // Create a new project instance
      const newProject = new Project({
        name,
        description,
        startDate: start,
        endDate: end,
        status,
        teamMembers,
      });
  
      // Save the new project to the database
      await newProject.save();
  
      res.status(201).json({
        message: "Project created successfully",
        project: newProject,
      });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Server error" });
    }
};

// Get all projects
const getAllProjectsByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // User ID is passed as a URL parameter

    // Find projects where the user is a part of the team (teamMembers array contains the userId)
    const projects = await Project.find({ teamMembers: userId }).populate("teamMembers", "email name");

    // If no projects are found for the user
    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found for this user." });
    }

    // Return the projects for this user
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("teamMembers", "username email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, startDate, endDate, status, teamMembers } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        name,
        description,
        startDate,
        endDate,
        status,
        teamMembers,
      },
      { new: true }
    ).populate("teamMembers", "username email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
