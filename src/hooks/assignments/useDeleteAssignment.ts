import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentsApi } from "../../api/assignmentsApi";

export const useDeleteAssignments = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: assignmentsApi.delete,
    onSuccess: () => qc.invalidateQueries({queryKey : ["assignments"] }),
  });
};
