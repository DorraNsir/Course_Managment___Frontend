import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "../../api/coursesApi";

type UpdateCoursePayload = {
  id: number;
  data: any;
};
export const useUpdateCourse = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCoursePayload) =>coursesApi.update(payload.id,payload.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
};
