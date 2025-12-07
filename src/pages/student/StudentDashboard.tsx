import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CourseCard } from "@/components/shared/CourseCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCourses } from "@/hooks/courses/useCourses";
import { useMatieres } from "@/hooks/matieres/useMatires";
import { useUsers } from "@/hooks/users/useUsers";
import { useAssignments } from "@/hooks/assignments/useAssignments";

const StudentDashboard = () => {
const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  const { data: courses } = useCourses();
  const { data: users } = useUsers();
  const user = users?.find(u => u.id === userId);
  const groupId = user?.groupId;
  const{data:assignments}=useAssignments()
// 1️⃣ All assignments for this group
const groupAssignments = assignments?.filter(a => a.groupId === groupId) || [];

// 2️⃣ Unique matieres from assignments
const matieresInGroup = Array.from(
  new Map(
    groupAssignments.map(a => [
      a.matiereId,
      { matiereId: a.matiereId, matiereName: a.matiereName }
    ])
  ).values()
)as Array<{ matiereId: number; matiereName: string }>;

// 3️⃣ Courses of the student group
const studentCourses = courses?.filter(c => c.groupId === groupId) || [];

// 4️⃣ Build the final grouped list
const coursesBySubject = matieresInGroup.map(m => ({
  subjectId: m.matiereId,
  subjectName: m.matiereName,
  courses: studentCourses.filter(c => c.matiereId === m.matiereId)
}));




  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Breadcrumb
          items={[
            { label: "Mes cours" },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Mes Cours</h1>
          <p className="text-muted-foreground">
            Accédez à tous vos cours et ressources pédagogiques
          </p>
        </motion.div>

        <div className="space-y-12">
          {coursesBySubject?.map((group, groupIndex) => (
            <motion.div
              key={group.subjectId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-1">{group.subjectName}</h2>
                <p className="text-muted-foreground text-sm">
                  {group.courses.length} cours disponible{group.courses.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    actionLabel="Voir le cours"
                    onAction={() => navigate(`/student/course/${course.id}`)}
                    showTeacher={true}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
