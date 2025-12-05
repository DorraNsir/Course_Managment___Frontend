import { api } from "./axiosInstance";

export const coursesApi = {
  getAll: () => api.get("/courses").then(r => r.data),
  getById: (id) => api.get(`/courses/${id}`).then(r => r.data),
  create: (data) => api.post("/courses", data).then(r => r.data),
  update: (id, data) => api.patch(`/courses/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/courses/${id}`).then(r => r.data),
  getByTeacherAndGroup: (teacherId, groupId) =>api.get(`/courses/teacher/${teacherId}/group/${groupId}`).then(r => r.data),

};
