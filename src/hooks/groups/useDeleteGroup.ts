import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupsApi } from "../../api/groupApi";

export const useDeleteGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupsApi.delete,
    onSuccess: () => qc.invalidateQueries({queryKey : ["groups"] }),
  });
};
