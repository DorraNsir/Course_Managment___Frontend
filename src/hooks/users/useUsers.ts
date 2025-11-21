import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/usersApi";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getAll,
  });
