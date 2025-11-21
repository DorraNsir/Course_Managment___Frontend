import { api } from "./axiosInstance";

export const matieresApi = {
  getAll: () => api.get("/matieres").then(r => r.data),
  create: (data) => api.post("/matieres", data).then(r => r.data),
  update: (id, data) => api.put(`/matieres/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/matieres/${id}`).then(r => r.data),
};
