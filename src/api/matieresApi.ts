import { api } from "./axiosInstance";

export const matieresApi = {
  getAll: () => api.get("/matiere").then(r => r.data),
  create: (data) => api.post("/matiere", data).then(r => r.data),
  update: (id, data) => api.patch(`/matiere/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/matiere/${id}`).then(r => r.data),
};
