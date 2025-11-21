import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupsApi } from "../../api/groupApi";

export const useCreateGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: groupsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["groups"] }),
  });
};
