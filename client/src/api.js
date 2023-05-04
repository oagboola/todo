import axios from "axios";

// initializing the axios instance with custom configs
console.log("sdfdsfdsf", process.env.REACT_APP_BASE_URL);
const api = axios.create({
  "Access-Control-Allow-Credentials": true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default api;
