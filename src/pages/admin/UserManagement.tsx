import { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Search } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useUsers } from "../../hooks/users/useUsers";
import { useGroups } from "@/hooks/groups/useGroups";
import { CreateUserDialog } from "@/components/userMangment/CreateUserDialog";
import { UpdateUserDialog } from "@/components/userMangment/UpdateUserDialog";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";

const UserManagement = () => {
  
  const { data: users, isLoading } = useUsers();
  const { data: groups, isLoading:Load } = useGroups();
  const deleteUser=useDeleteUser()
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState< "all"|"teacher" | "student">("all");
  const filteredUsers = (users ?? []).filter(user => {
  const matchesSearch =
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
    });

  const handleDeleteUser = async (userId: number) => {
    await deleteUser.mutateAsync(userId);
    toast.success("Utilisateur supprimé avec succès !");
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar role="admin" />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Gestion des Utilisateurs" },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">Gérer les enseignants et étudiants</p>
        </motion.div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Liste des Utilisateurs</CardTitle>
              <CreateUserDialog groups={groups || []} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRole} onValueChange={(value: any) => setFilterRole(value)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="teacher">Enseignants</SelectItem>
                  <SelectItem value="student">Étudiants</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Groupes</TableHead>
                    <TableHead>Mot de Passe</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "teacher" ? "default" : "secondary"}>
                          {user.role === "teacher" ? "Enseignant" : "Étudiant"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {user.groupId? groups?.find(g=>g.id===user.groupId)?.name : "Aucun"}
                        </span>
                      </TableCell>
                      <TableCell>*************</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <UpdateUserDialog groups={groups || []} user={users.find(u=>u.id===user.id)}/>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
