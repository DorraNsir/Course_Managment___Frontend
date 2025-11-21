import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matieresApi } from "../../api/matieresApi";

export const useCreateMatiere = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: matieresApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["matieres"] }),
  });
};
