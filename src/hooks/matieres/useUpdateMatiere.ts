import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matieresApi } from "../../api/matieresApi";

type UpdateMatierePayload = {
  id: number;
  data: any;
};
export const useUpdateMatiere = () => {
  const qc = useQueryClient();

  return useMutation({
    
    mutationFn: (payload: UpdateMatierePayload) =>matieresApi.update(payload.id,payload.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["matieres"] }),
  });
};