import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "../../api/coursesApi";

export const useCreateCourse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: coursesApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
};
