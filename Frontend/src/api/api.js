import axios from "axios";

const API = axios.create({
  baseURL: "https://hyperdrop.onrender.com/api",
});

export default API;
