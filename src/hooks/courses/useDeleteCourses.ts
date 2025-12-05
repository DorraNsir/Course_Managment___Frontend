import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "../../api/coursesApi";

export const useDeleteCourse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: coursesApi.delete,
    onSuccess: () => qc.invalidateQueries({queryKey : ["courses"] }),
  });
};
