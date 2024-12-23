import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjects } from '../services/api';
import ProgressBar from '../components/ProgressBar'; // Import the ProgressBar component

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(projectId);
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Project not found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{project.name}</h2>
        <p className="text-gray-700 mb-4">{project.description}</p>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-600">Progress</h3>
          <ProgressBar progress={project.progress} /> {/* Use the ProgressBar component */}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-600">Status</h3>
          <p className="text-lg font-semibold text-gray-700">{project.status}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-600">Team Members</h3>
          <div className="space-x-4">
            {project.teamMembers.map((member) => (
              <span key={member.id} className="text-xs text-gray-700">{member.name}</span>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <div>
            <span className="text-sm text-gray-600">Start Date:</span>
            <p className="text-sm text-gray-700">{new Date(project.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">End Date:</span>
            <p className="text-sm text-gray-700">{new Date(project.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
