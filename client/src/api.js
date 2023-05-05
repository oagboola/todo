import axios from "axios";

// initializing the axios instance with custom configs
const api = axios.create({
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default api;
