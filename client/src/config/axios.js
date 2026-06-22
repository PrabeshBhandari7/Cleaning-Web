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

export default api;
