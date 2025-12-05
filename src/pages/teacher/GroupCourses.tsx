import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useNavigate, useParams } from "react-router-dom";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useCoursesByTeacherAndGroup } from "@/hooks/courses/useGetCoursesByTeacherId";
import { useGetGroupById } from "@/hooks/groups/useGetGroupById";
import { useDeleteCourse } from "@/hooks/courses/useDeleteCourses";

const GroupCourses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const groupId =Number(id)
  const userId =localStorage.getItem("userId")
  const {data:courses}=useCoursesByTeacherAndGroup(Number(userId),Number(id))
  const {data:group}=useGetGroupById(groupId)
  const deleteCourse=useDeleteCourse()
    
  if (!group) {
    return <div>Groupe non trouvé</div>;
  }

  const handleEdit = (courseId:string) => {
    navigate(`/teacher/update-course/${courseId }`)
    
  };

  const handleDelete =async (courseId: string) => {
    await deleteCourse.mutateAsync(courseId);
    toast.success(`Cours supprimé avec succès`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Breadcrumb
          items={[
            { label: "Tableau de bord", href: "/teacher/dashboard" },
            { label: `${group.name}_${group.description}` },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              {/* <h1 className="text-3xl font-bold mb-2">{group.groupName}</h1> */}
              <p className="text-muted-foreground">
                {courses?.length} cours disponibles
              </p>
            </div>
            <Button onClick={() => navigate(`/teacher/add-course/${groupId}`)} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un cours
            </Button>
          </div>
        </motion.div>

        <div className="space-y-4">
          {courses?.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="px-2 py-1 bg-secondary rounded text-secondary-foreground">
                            {course.matiereName}
                          </span>
                          <span className="px-2 py-1 bg-muted rounded text-muted-foreground">
                            {course.hasSubmission ? "Avec remise" : "Sans remise"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(course.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupCourses;
