import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matieresApi } from "../../api/matieresApi";

export const useDeleteMatiere = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: matieresApi.delete,
    onSuccess: () => qc.invalidateQueries({queryKey : ["matieres"] }),
  });
};
