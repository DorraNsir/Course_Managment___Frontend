import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { GroupCard } from "@/components/shared/GroupCard";
import { mockGroups } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar role="teacher" />
      <div className="container py-8">
        <Breadcrumb
          items={[
            { label: "Tableau de bord" },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Mes Groupes</h1>
          <p className="text-muted-foreground">
            Gérez vos groupes d'étudiants et leurs cours
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GroupCard
                group={group}
                onViewCourses={() => navigate(`/teacher/group/${group.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
