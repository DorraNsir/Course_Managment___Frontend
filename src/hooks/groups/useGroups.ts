import { useQuery } from "@tanstack/react-query";
import { groupsApi } from "../../api/groupApi";

export const useGroups = () =>
  useQuery({
    queryKey: ["groups"],
    queryFn: groupsApi.getAll,
  });
