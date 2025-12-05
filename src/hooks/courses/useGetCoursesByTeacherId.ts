import { useQuery } from "@tanstack/react-query";
import { coursesApi } from "../../api/coursesApi";

export const useCoursesByTeacherAndGroup = (teacherId, groupId) =>
  useQuery({
    queryKey: ["courses", teacherId, groupId],
    queryFn: () => coursesApi.getByTeacherAndGroup(teacherId, groupId),
    enabled: !!teacherId && !!groupId,
  });
