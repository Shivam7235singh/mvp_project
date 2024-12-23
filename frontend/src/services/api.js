const API_URL = "http://localhost:4000/api/v1/";

// Utility function for handling fetch requests
const fetchApi = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`API Request Failed: ${error.message}`);
  }
};

// POST request to login
export const loginUser = async (userData) => {
  const response = await fetchApi(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response;
};

// GET request to fetch all projects
export const fetchProjects = async () => {
  const response = await fetchApi(`${API_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// GET request to fetch a single project by ID
export const fetchProjectById = async (projectId) => {
  const response = await fetchApi(`${API_URL}/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// POST request to create a new project
export const createProject = async (projectData) => {
  const response = await fetchApi(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  return response;
};

// PUT request to update an existing project by ID
export const updateProject = async (projectId, projectData) => {
  const response = await fetchApi(`${API_URL}/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  return response;
};

// DELETE request to delete a project by ID
export const deleteProject = async (projectId) => {
  const response = await fetchApi(`${API_URL}/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;


};



