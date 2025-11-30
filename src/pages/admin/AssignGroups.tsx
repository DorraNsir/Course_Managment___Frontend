import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useUsers } from "@/hooks/users/useUsers";
import { useGroups } from "@/hooks/groups/useGroups";
import { useMatieres } from "@/hooks/matieres/useMatires";
import { useCreateAssignment } from "@/hooks/assignments/useCreateAssignment";
import { useAssignments } from "@/hooks/assignments/useAssignments";

const AssignGroups = () => {
  const {data:teachers}=useUsers()
  const{data:groups}=useGroups()
  const{data:matieres}=useMatieres()
  const {data:assignments}=useAssignments()
  const createAssignment=useCreateAssignment()
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedMatiere, setSelectedMatiere] = useState("");
const handleAssign = async () => {
  // Validate required fields
  if (!selectedUser || !selectedGroup || !selectedMatiere) {
    toast.error("Veuillez sélectionner un utilisateur, une matière et un groupe.");
    return;
  }

  try {
    await createAssignment.mutateAsync({
      teacherId: Number(selectedUser),
      matiereId: Number(selectedMatiere),
      groupId: Number(selectedGroup),
    });

    toast.success("Affectation effectuée avec succès");

    // Reset
    setSelectedUser("");
    setSelectedGroup("");
    setSelectedMatiere("");

  } catch (error: any) {
    console.error(error);

    // If backend returned a message
    if (error?.response?.data) {
      toast.error(error.response.data);
    } 
    // If Axios error has message
    else if (error?.message) {
      toast.error(`Erreur : ${error.message}`);
    } 
    // Fallback generic error
    else {
      toast.error("Une erreur est survenue lors de l'affectation.");
    }
  }
};


    const groupedAssignments = assignments?.reduce((acc, a) => {
    if (!acc[a.teacherId]) {
      acc[a.teacherId] = {
        teacherName: a.teacherName,
        teacherId: a.teacherId,
        matieres: [],
        groups: []
      };
    }

    acc[a.teacherId].groups.push(a.groupName);
    acc[a.teacherId].matieres.push(a.matiereName);

    return acc;
  }, {});

  const teachersList = groupedAssignments
    ? Object.values(groupedAssignments)
    : [];




  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Affectation des Groupes" },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Affectation des Groupes</h1>
          <p className="text-muted-foreground">Affecter des groupes aux enseignants et étudiants</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Nouvelle Affectation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="user">Sélectionner Utilisateur</Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Choisir un utilisateur" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="px-2 py-1.5 text-sm font-semibold">Enseignants</div>
                      {teachers?.filter(u => u.role === "teacher").map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.fullName} - {user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="group">Sélectionner Groupe</Label>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger id="group">
                      <SelectValue placeholder="Choisir un groupe" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups?.map(group => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}    
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="group">Sélectionner Matiere</Label>
                  <Select value={selectedMatiere} onValueChange={setSelectedMatiere}>
                    <SelectTrigger id="group">
                      <SelectValue placeholder="Choisir un groupe" />
                    </SelectTrigger>
                    <SelectContent>
                      {matieres?.map(m => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name} 
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" onClick={handleAssign}>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Affecter le Groupe
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Affectations Actuelles
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {assignments?.map(a => (
                <div
                  key={a.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{a.teacherName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {a.matiereName}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge key={a.id} variant="outline">{a.groupName}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AssignGroups;
