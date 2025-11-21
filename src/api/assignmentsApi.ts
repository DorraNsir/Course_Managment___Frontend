import { api } from "./axiosInstance";

export const assignmentsApi = {
  getAll: () => api.get("/TeacherMatiereGroup").then(r => r.data),
  assign: (data) => api.post("/TeacherMatiereGroup", data).then(r => r.data),
  delete: (id) => api.delete(`/TeacherMatiereGroup/${id}`).then(r => r.data),
};
