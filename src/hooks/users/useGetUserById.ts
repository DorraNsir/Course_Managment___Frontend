import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/usersApi";

export const useGetUserById = (id) =>
  useQuery({
    queryKey: ["users",id],
    queryFn: ()=> usersApi.getById(id),
    enabled: !!id, // only run when ID exists

  });
