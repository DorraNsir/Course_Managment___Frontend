import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../../api/usersApi";

export const useCreateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
