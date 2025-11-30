import { api } from "./axiosInstance";

export const authApi = {
  login: (data) => api.post("/auth/login", data).then(r => r.data),

};
