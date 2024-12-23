import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <span className="text-xs font-semibold inline-block py-1 uppercase">
          {progress}% Completed
        </span>
      </div>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-blue-500 text-xs font-semibold text-blue-100 text-center p-1 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
