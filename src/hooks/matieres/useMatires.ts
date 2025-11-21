import { useQuery } from "@tanstack/react-query";
import { matieresApi } from "../../api/matieresApi";

export const useMatieres = () =>
  useQuery({
    queryKey: ["matieres"],
    queryFn: matieresApi.getAll,
  });
