import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_NODE_API_URI, // Add this in env --> REACT_APP_NODE_API_URI=http://localhost:4000/
});

export default API;
