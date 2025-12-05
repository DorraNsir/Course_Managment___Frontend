import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7286/api", // your .NET API
  headers: {
    "Content-Type": "application/json",
  },
});
// Automatically attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout if token invalid or expired
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );