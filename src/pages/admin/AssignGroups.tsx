import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { mockUsers, mockGroups } from "@/lib/mockData";
import { toast } from "sonner";

const AssignGroups = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleAssign = () => {
    if (!selectedUser || !selectedGroup) {
      toast.error("Veuillez sélectionner un utilisateur et un groupe");
      return;
    }
    toast.success("Groupe affecté avec succès");
    setSelectedUser("");
    setSelectedGroup("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar role="admin" />
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
          {/* Assignment Form */}
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
                      {mockUsers.filter(u => u.role === "teacher").map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} - {user.email}
                        </SelectItem>
                      ))}
                      <div className="px-2 py-1.5 text-sm font-semibold border-t mt-2">Étudiants</div>
                      {mockUsers.filter(u => u.role === "student").map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} - {user.email}
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
                      {mockGroups.map(group => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name} ({group.studentCount} étudiants)
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

          {/* Current Assignments */}
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
                  {mockUsers.map(user => (
                    <div
                      key={user.id}
                      className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant={user.role === "teacher" ? "default" : "secondary"}>
                          {user.role === "teacher" ? "Enseignant" : "Étudiant"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {user.groupIds.map(groupId => {
                          const group = mockGroups.find(g => g.id === groupId);
                          return group ? (
                            <Badge key={groupId} variant="outline">
                              {group.name}
                            </Badge>
                          ) : null;
                        })}
                        {user.groupIds.length === 0 && (
                          <span className="text-sm text-muted-foreground">Aucun groupe affecté</span>
                        )}
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
