import { useQuery } from "@tanstack/react-query";
import { coursesApi } from "../../api/coursesApi";

export const useGetCourseById = (id: number | string | undefined) =>
  useQuery({
    queryKey: ["course", id],
    queryFn: () => coursesApi.getById(id),
    enabled: !!id, // fetch ONLY if an id exists
  });
