import { coursesApi } from "@/api/coursesApi";
import { useQuery } from "@tanstack/react-query";


export const useCourses = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: coursesApi.getAll,
  });
