import axios from "axios";

// initializing the axios instance with custom configs
const api = axios.create({
  "Access-Control-Allow-Credentials": true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default api;
