import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CourseCard } from "@/components/shared/CourseCard";
import { mockCourses, subjects } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const coursesBySubject = subjects.map((subject) => ({
    subject,
    courses: mockCourses.filter((c) => c.subject === subject),
  })).filter((group) => group.courses.length > 0);

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
          {coursesBySubject.map((group, groupIndex) => (
            <motion.div
              key={group.subject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-1">{group.subject}</h2>
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
