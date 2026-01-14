import axios from "axios";

// one shared axios instance for the whole app
const api = axios.create({
  baseURL: "/api",  
  timeout: 15000,
});

// automatically attach token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ebuy_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
