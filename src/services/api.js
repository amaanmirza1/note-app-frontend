import axios from "axios";

const API = axios.create({
  baseURL: "https://note-app-backend-1-jvdq.onrender.com/api/",
});


// 🔥 TOKEN AUTO ADD (CLEAN FIX)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;