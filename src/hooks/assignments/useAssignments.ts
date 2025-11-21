import { useQuery } from "@tanstack/react-query";
import { assignmentsApi } from "../../api/assignmentsApi";

export const useAssignments = () =>
  useQuery({
    queryKey: ["assignments"],
    queryFn: assignmentsApi.getAll,
  });
