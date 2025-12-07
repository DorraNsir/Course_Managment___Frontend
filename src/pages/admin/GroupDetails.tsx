import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, Mail, Search, CloudCog } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useGroups } from "@/hooks/groups/useGroups";
import { useUsers } from "@/hooks/users/useUsers";
import { useAssignments } from "@/hooks/assignments/useAssignments";
import { useMatieres } from "@/hooks/matieres/useMatires";
import { useState } from "react";

const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { data: groups } = useGroups();
  const { data: users } = useUsers();
  const { data: assignments } = useAssignments();
  const { data: matieres } = useMatieres();
  const [studentSearch, setStudentSearch] = useState("");

  const group = groups?.find(g => g.id === numericId);
  const students = users?.filter(u => u.groupId === numericId && u.role === "student") || [];
  console.log(students)
  const groupAssignments = assignments?.filter(a => a.groupId === numericId) || [];
  
  // Get unique teachers and their matieres
  const teachersMap = new Map();
  groupAssignments.forEach(assignment => {
    const teacher = users?.find(u => u.id === assignment.teacherId);
    const matiere = matieres?.find(m => m.id === assignment.matiereId);
    
    if (teacher && matiere) {
      if (!teachersMap.has(teacher.id)) {
        teachersMap.set(teacher.id, {
          ...teacher,
          matieres: []
        });
      }
      teachersMap.get(teacher.id).matieres.push(matiere);
    }
  });
  
  const teachers = Array.from(teachersMap.values());
  
  const groupMatieres = matieres?.filter(m => 
    groupAssignments.some(a => a.matiereId === m.id)
  ) || [];

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Groupe non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Gestion des Groupes", href: "/admin/groups" },
            { label: group.name },
          ]}
        />

        {/* Group Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl">{group.name}</CardTitle>
              {group.description && (
                <p className="text-muted-foreground mt-2">{group.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background/50"
                >
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{students.length}</p>
                    <p className="text-sm text-muted-foreground">Étudiants</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background/50"
                >
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{teachers.length}</p>
                    <p className="text-sm text-muted-foreground">Enseignants</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background/50"
                >
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{groupMatieres.length}</p>
                    <p className="text-sm text-muted-foreground">Matières</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Students List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Étudiants ({students.length})
                </CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un étudiant..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {filteredStudents.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun étudiant
                    </p>
                  ) : (
                    filteredStudents?.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                      >
                        <p className="font-semibold">{student.fullName}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Mail className="h-3 w-3" />
                          {student.email}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Teachers List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Enseignants ({teachers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {teachers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun enseignant
                    </p>
                  ) : (
                    teachers.map((teacher, index) => (
                      <motion.div
                        key={teacher.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-semibold">{teacher.fullName}</p>
                          <Badge variant="secondary">Enseignant</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Mail className="h-3 w-3" />
                          {teacher.email}
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Matières:</p>
                          <div className="flex flex-wrap gap-1">
                            {teacher.matieres.map((matiere) => (
                              <Badge key={matiere.id} variant="outline" className="text-xs">
                                {matiere.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Matieres List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Matières ({groupMatieres.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {groupMatieres.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune matière
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupMatieres.map((matiere, index) => (
                    <motion.div
                      key={matiere.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold">{matiere.name}</p>
                      {matiere.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {matiere.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GroupDetails;
