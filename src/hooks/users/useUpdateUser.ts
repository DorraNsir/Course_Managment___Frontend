import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../../api/usersApi";

type UpdateUserPayload = {
  id: number;
  data: any;
};

export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) =>
      usersApi.update(payload.id, payload.data),

    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
