import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateMatiere } from "@/hooks/matieres/useCreateMatiere";

export function CreateMatiereDialog() {

  const createMatiere = useCreateMatiere();
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    
    onSubmit: async ({ value }) => {
      await createMatiere.mutateAsync({
        name: value.name,
        description: value.description,
      });

      toast.success("Utilisateur ajouté !");
      form.reset();     // reset form
      setOpen(false);   // CLOSE DIALOG
    }, 
    
  });
 

  return (
<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Matiere
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une Nouvelle Matiere </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4 pt-4"
        >
          {/* GROUP NAME */}
          <form.Field
            name="name"
            children={(field) => (
              <div>
                <Label>Nom du Matiere</Label>
                <Input
                  placeholder="Mathématiques Générales"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          {/* DESCRIPTION */}
          <form.Field
            name="description"
            children={(field) => (
              <div>
                <Label>Description (optionnel)</Label>
                <Input
                  placeholder="Ex: Concepts fondamentaux... "
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={createMatiere.isPending}
          >
            {createMatiere.isPending ? "Création..." : "Créer le Groupe"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
