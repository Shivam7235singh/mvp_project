import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';  // Assuming you have an API service to fetch projects

const ProgressDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(); // Fetch all projects
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Project Progress Dashboard</h1>
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{project.name}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-600">Progress</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 uppercase">
                    {project.progress}% Completed
                  </span>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 uppercase">
                    Status: {project.status}
                  </span>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 uppercase">
                    Start Date: {new Date(project.startDate).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 uppercase">
                    End Date: {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full">
                      <div
                        className="bg-blue-500 text-xs font-semibold text-blue-100 text-center p-1 leading-none rounded-full"
                        style={{ width: `${project.progress}%` }}
                      >
                        {project.progress}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-gray-600">Team:</span>
              <div className="space-x-4">
                {project.teamMembers.map((member) => (
                  <span key={member.id} className="text-xs text-gray-700">{member.name}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressDashboard;
