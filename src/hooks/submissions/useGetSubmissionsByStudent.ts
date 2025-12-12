import { useQuery } from "@tanstack/react-query";
import { submissionsApi } from "@/api/submissionsApi";

export const useStudentSubmission = (courseId, studentId) =>
  useQuery({
    queryKey: ["submission","submissions", courseId, studentId],
    queryFn: () => submissionsApi.getStudentSubmission(courseId, studentId),
    retry: false, // prevent retry spam
  });
