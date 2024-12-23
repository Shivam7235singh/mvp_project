import React, { useState } from "react";

const ProjectForm = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "not started", // Default status
    teamMembers: [],
  });

  const [teamMember, setTeamMember] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTeamMemberChange = (e) => {
    setTeamMember(e.target.value);
  };

  const addTeamMember = () => {
    if (teamMember) {
      setProject((prevState) => ({
        ...prevState,
        teamMembers: [...prevState.teamMembers, teamMember],
      }));
      setTeamMember(""); // Reset the input field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      const result = await response.json();

        alert("Project created successfully!");
        setProject({
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          status: "not started",
          teamMembers: [],
        });
   
      
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={project.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={project.endDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={project.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on hold">On Hold</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700">
            Team Members
          </label>
          <input
            type="text"
            id="teamMember"
            value={teamMember}
            onChange={handleTeamMemberChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Add team member"
          />
          <button
            type="button"
            onClick={addTeamMember}
            className="mt-2 bg-blue-600 text-white p-2 rounded-md"
          >
            Add Team Member
          </button>
        </div>
        <div className="mb-4">
          <ul>
            {project.teamMembers.map((member, index) => (
              <li key={index} className="text-sm text-gray-700">
                {member}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md w-full"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
