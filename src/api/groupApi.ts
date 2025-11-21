import { api } from "./axiosInstance";

export const groupsApi = {
  getAll: () => api.get("/groups").then(r => r.data),
  getById: (id) => api.get(`/groups/${id}`).then(r => r.data),
  create: (data) => api.post("/groups", data).then(r => r.data),
  update: (id, data) => api.patch(`/groups/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/groups/${id}`).then(r => r.data),
};
