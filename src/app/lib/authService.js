import api from "./api";
import { setToken, removeToken } from "./tokenService";

// Register new user
export const registerUser = async (data) => {
  return await api.post("/auth/register", data);
};

// Login and save token
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  const token = response.data.token;
  setToken(token); // store in sessionStorage
  return response.data;
};

// Verify token validity (optional)
export const verifyToken = async () => {
  return await api.get("/auth/verify");
};

// Logout and clear token
export const logoutUser = () => {
  removeToken();
  window.location.href = "/login";
};
