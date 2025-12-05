import { useQuery } from "@tanstack/react-query";
import { groupsApi } from "../../api/groupApi";

export const useGetGroupById = (id: number | string | undefined) =>
  useQuery({
    queryKey: ["groups", id],
    queryFn: () => groupsApi.getById(id),
    enabled: !!id, // fetch ONLY if an id exists
  });
