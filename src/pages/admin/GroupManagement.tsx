
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Trash2, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGroups } from "@/hooks/groups/useGroups";
import { CreateGroupDialog } from "@/components/groupManagment/createGroupDialog";
import { UpdateGroupDialog } from "@/components/groupManagment/UpdateGroupDialog";
import { useDeleteGroup } from "@/hooks/groups/useDeleteGroup";
import { useUsers } from "@/hooks/users/useUsers";
import { useAssignments } from "@/hooks/assignments/useAssignments";


const GroupManagement = () => {
  const navigate = useNavigate();
  const { data: groups, isLoading:Load } = useGroups();
  const{data:users}=useUsers();
  const{data:assignments}=useAssignments()
  const deleteGroup=useDeleteGroup()
  
  const handleDeleteGroup = async (groupId: string) => {
    await deleteGroup.mutateAsync(groupId);
    toast.success("Groupe supprimé avec succès");
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Gestion des Groupes" },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestion des Groupes</h1>
              <p className="text-muted-foreground">Créer et gérer les groupes d'étudiants</p>
            </div>
            <CreateGroupDialog />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups?.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{group.name}_{group.description}</span>
                    
                    <div className="flex gap-1">
                      <UpdateGroupDialog group={groups?.find(g=>g.id===group.id)}/>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{users?.filter(u => u.groupId === group.id).length} étudiants</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm">{assignments?.filter(u => u.groupId === group.id).length} matieres</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => navigate(`/admin/groups/${group.id}`)}
                    >
                      Voir Détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupManagement;
