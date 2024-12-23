// Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["not started", "in progress", "completed", "on hold"], // You can customize the status options
      default: "not started",
    },
    teamMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for team members
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Creating the Project model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
