import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-2xl transition duration-300">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700">Progress</h4>
        <ProgressBar progress={project.progress} />
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Status: {project.status}</span>
        <Link
          to={`/projects/${project.id}`}
          className="text-sm text-blue-500 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
