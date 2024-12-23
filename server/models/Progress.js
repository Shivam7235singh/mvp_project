// Progress.js
const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // Referring to the Project model
      required: true,
    },
    progressPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Ensure progress is between 0 and 100
    },
    updateDescription: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Creating the Progress model
const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
