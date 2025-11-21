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
import { Edit, Plus } from "lucide-react";
import { useUpdateMatiere } from "@/hooks/matieres/useUpdateMatiere";

export function UpdateMatiereDialog({matiere}) {

  const updateMatiere = useUpdateMatiere();
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: matiere.name || "",
      description: matiere.description || "",
    },
    
    onSubmit: async ({ value }) => {
      await updateMatiere.mutateAsync({
        id:matiere.id,
        data:{
        name: value.name,
        description: value.description,
      }});

      toast.success("Matiere modifié !");
      form.reset();     // reset form
      setOpen(false);   // CLOSE DIALOG
    }, 
    
  });
 

  return (
<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}variant="ghost" size="icon" className="h-8 w-8"> 
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modéfier Matiere </DialogTitle>
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
            disabled={updateMatiere.isPending}
          >
            {updateMatiere.isPending ? "Modéfication..." : "Modéfier le Groupe"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
