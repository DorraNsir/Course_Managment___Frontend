import { api } from "./axiosInstance";

export const submissionsApi = {
  create: (data) => api.post("/submissions", data).then(r => r.data),

  getByCourse: (courseId) =>
    api.get(`/submissions/course/${courseId}`).then(r => r.data),

  getStudentSubmission: async (courseId, studentId) => {
  try {
    const res = await api.get(`/submissions/student/${courseId}/${studentId}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return null; // 🔥 Treat "Not Found" as "no submission yet"
    }
    throw err; // Other errors should still be shown
  }
},


  delete: (id) =>
    api.delete(`/submissions/${id}`).then(r => r.data),
};
