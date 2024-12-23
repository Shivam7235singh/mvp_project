import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-6">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          Welcome to Our Project!
        </h1>
        <p className="text-xl text-gray-700">
          Discover our innovative platform and stay updated with the latest progress!
        </p>
      </header>

      <section className="mb-12 flex gap-4">
  <Link
    to="/projectexplore"
    className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
  >
    Explore Projects
  </Link>
  <Link
    to="/projectform"
    className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
  >
    Add Projects
  </Link>
</section>


      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Track Progress</h3>
          <p className="text-gray-700">
            Monitor the progress of your projects with easy-to-read progress bars and milestones.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Collaborate with Teams</h3>
          <p className="text-gray-700">
            Collaborate with your team seamlessly and stay on top of tasks with real-time updates.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Stay Informed</h3>
          <p className="text-gray-700">
            Get the latest updates and notifications to stay informed about your project's progress.
          </p>
        </div>
      </section>

      <footer className="mt-12 text-gray-600">
        <p>&copy; 2024 Your Project Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
