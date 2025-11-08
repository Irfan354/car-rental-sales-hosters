import axios from "axios";

// Create axios instance (base configuration)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // your Spring Boot backend
  withCredentials: true, // allows cookies / credentials if needed
});

// Request - Attach JWT token automatically for every request
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // get token from sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response - handle 401 - if error comes then remove the token
api.interceptors.response.use(
  (response) => response, (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Token might have expired.");
        sessionStorage.removeItem("token"); // token expired or invalid
        window.location.href = "auth/login"; // redirect to login
    }
    return Promise.reject(error);
  } 
);


export default api;
