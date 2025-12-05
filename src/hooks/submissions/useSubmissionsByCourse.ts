import { useQuery } from "@tanstack/react-query";
import { submissionsApi } from "@/api/submissionsApi";

export const useSubmissionsByCourse = (courseId: string | number | undefined) =>
  useQuery({
    queryKey: ["submissions", "course", courseId],
    queryFn: () => submissionsApi.getByCourse(courseId!),
    enabled: !!courseId,
  });
