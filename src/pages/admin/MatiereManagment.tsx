
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {BookOpen, Trash2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useMatieres } from "@/hooks/matieres/useMatires";
import { useDeleteMatiere } from "@/hooks/matieres/useDeleteMatiere";
import { CreateMatiereDialog } from "@/components/matiereManagment/createMatiereDialog";
import { UpdateMatiereDialog } from "@/components/matiereManagment/updateMatiereDialog";


const MatiereManagement = () => {
   const { data: matieres, isLoading:Load } = useMatieres();
   const deleteMatiere=useDeleteMatiere()

  const handleDeleteMatiere = async (matiereId: string) => {
    await deleteMatiere.mutateAsync(matiereId);
    toast.success("Groupe supprimé avec succès");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Gestion des Matieres" },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestion des Matieres</h1>
              <p className="text-muted-foreground">Créer et gérer les Matieres</p>
            </div>
            <CreateMatiereDialog />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {matieres?.map((m, index) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{m.name}</span>
                    
                    <div className="flex">
                      <UpdateMatiereDialog matiere={matieres.find(mt=>mt.id===m.id)}/>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDeleteMatiere(m.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    {m.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatiereManagement;
