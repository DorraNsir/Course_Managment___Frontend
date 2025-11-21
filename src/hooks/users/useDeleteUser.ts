import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../../api/usersApi";

export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => qc.invalidateQueries({queryKey : ["users"] }),
  });
};
