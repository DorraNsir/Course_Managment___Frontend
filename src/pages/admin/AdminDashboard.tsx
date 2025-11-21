import { Navbar } from "@/components/shared/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { mockGroups, mockCourses, mockUsers } from "@/lib/mockData";
import { useUsers } from "@/hooks/users/useUsers";
import { useGroups } from "@/hooks/groups/useGroups";
import { useMatieres } from "@/hooks/matieres/useMatires";



const AdminDashboard = () => {
  const navigate = useNavigate();
  const{data:users}=useUsers()
  const{data:groups}=useGroups()
  const{data:matieres}=useMatieres()
  
  

  const stats = [
    {
      title: "Total Utilisateurs",
      value: users?.length,  
      icon: Users,
      description: `${users?.filter(u => u.role === "teacher").length} enseignants, ${users?.filter(u => u.role === "student").length} étudiants`,
      color: "text-blue-600",
    },
    {
      title: "Groupes",
      value: groups?.length,
      icon: GraduationCap,
      description: "Groupes actifs",
      color: "text-green-600",
    },
    {
      title: "Matieres",
      value: matieres?.length,
      icon: BookOpen,
      description: "Total des cours",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar role="admin" />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Tableau de Bord Administrateur</h1>
          <p className="text-muted-foreground">Bienvenue sur le panneau d'administration</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/users")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Gérer les enseignants et étudiants</p>
                <Button variant="outline" className="w-full">Accéder</Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/groups")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Groupes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Créer et gérer les groupes</p>
                <Button variant="outline" className="w-full">Accéder</Button>
              </CardContent>

            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/matieres")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Matieres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Créer et gérer les matieres</p>
                <Button variant="outline" className="w-full">Accéder</Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/assign")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Affectations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Affecter groupes aux utilisateurs</p>
                <Button variant="outline" className="w-full">Accéder</Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
