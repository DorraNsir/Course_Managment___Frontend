import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupsApi } from "../../api/groupApi";

export const useUpdateGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupsApi.update,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["groups"] }),
  });
};
