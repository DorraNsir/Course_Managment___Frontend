import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionsApi } from "@/api/submissionsApi";

export const useCreateSubmission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: submissionsApi.create,

    onSuccess: (_, payload) => {
      // Payload contains courseId + studentId
      qc.invalidateQueries({
        queryKey: ["submission", "submissions", payload.courseId, payload.studentId],
      });

      // Optional: invalidate course submissions list
      qc.invalidateQueries({
        queryKey: ["submissions", "course", payload.courseId],
      });
    },
  });
};
