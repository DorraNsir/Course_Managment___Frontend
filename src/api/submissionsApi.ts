import { api } from "./axiosInstance";

export const submissionsApi = {
  getByCourse: (courseId: string | number) => 
    api.get(`/submissions/course/${courseId}`).then(r => r.data),
  getByStudent: (studentId: string | number) => 
    api.get(`/submissions/student/${studentId}`).then(r => r.data),
  create: (data: { courseId: number; studentId: number; fileUrl: string }) => 
    api.post("/submissions", data).then(r => r.data),
  delete: (id: string | number) => 
    api.delete(`/submissions/${id}`).then(r => r.data),
};
