import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matieresApi } from "../../api/matieresApi";

export const useUpdateMatiere = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: matieresApi.update,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["matieres"] }),
  });
};