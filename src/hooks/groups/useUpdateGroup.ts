import { useMutation, useQueryClient } from "@tanstack/react-query";
import { groupsApi } from "../../api/groupApi";

type UpdateGroupPayload = {
  id: number;
  data: any;
};
export const useUpdateGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateGroupPayload) =>groupsApi.update(payload.id,payload.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["groups"] }),
  });
};
