import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5097/api", // your .NET API
  headers: {
    "Content-Type": "application/json",
  },
});
