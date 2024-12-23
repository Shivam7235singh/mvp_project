import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard"; // Import ProjectCard

// Assuming the user ID is available as `userId` (You can fetch this from context, props, or a global state)
const ProjectExplore = ({ userId }) => {
  const [projects, setProjects] = useState([]); // State for projects
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages

  // Function to fetch projects from the API
  const loadProjects = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(`https://mvp-project-backend.onrender.com/projects/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json(); // Parse JSON response
      setProjects(data.projects); // Update projects state (Ensure the response is structured correctly)
    } catch (error) {
      setError("Failed to fetch projects. Please try again later.");
      console.error("Error fetching projects:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    if (userId) {
      loadProjects();
    }
  }, [userId]); // Dependency array ensures that the effect re-runs when `userId` changes

  // Display loading indicator while fetching
  if (loading) {
    return <p className="text-center text-lg">Loading projects...</p>;
  }

  // Display error message if fetching fails
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-6">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          Welcome to Our Projects!
        </h1>
        <p className="text-xl text-gray-700">
          Discover our innovative platform and stay updated with the latest progress!
        </p>
      </header>

      {/* Projects Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} /> // Pass project object to ProjectCard
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-12 text-gray-600">
        <p>&copy; 2024 Your Project Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProjectExplore;
