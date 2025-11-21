import { api } from "./axiosInstance";

export const assignmentsApi = {
  getAll: () => api.get("/assignments").then(r => r.data),
  assign: (data) => api.post("/assignments", data).then(r => r.data),
  delete: (id) => api.delete(`/assignments/${id}`).then(r => r.data),
};
