import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionsApi } from "@/api/submissionsApi";

export const useDeleteSubmission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: submissionsApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["submissions","course"] });
    }
  });
};
