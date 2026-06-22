import axios from 'axios';

let _adminJwt = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://platinumsmilecleaning.com/api' : 'http://localhost:5000/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAdminToken = (token) => {
  _adminJwt = token;
};

export const getAdminToken = () => {
  return _adminJwt;
};

// Add a request interceptor to attach the JWT token if it exists
api.interceptors.request.use(
  (config) => {
    if (_adminJwt) {
      config.headers['Authorization'] = `Bearer ${_adminJwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to catch network errors globally and resolve API errors 
// so the existing codebase's `if (data.success)` logic still works without throwing.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      // Resolve it so the components can handle the structured error in `res.data`
      return Promise.resolve(error.response);
    } else if (error.request) {
      // The request was made but no response was received (Network error)
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else caused the error
      return Promise.reject(new Error(error.message));
    }
  }
);

export default api;
