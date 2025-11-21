import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentsApi } from "../../api/assignmentsApi";

export const useCreateAssignment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: assignmentsApi.assign,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assignments"] }),
  });
};
