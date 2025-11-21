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
import { Edit} from "lucide-react";
import { useUpdateGroup } from "@/hooks/groups/useUpdateGroup";

export function UpdateGroupDialog({group}) {

  const updateGroup = useUpdateGroup();
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name:group.name || "",
      description: group.description|| "",
    },
    
    onSubmit: async ({ value }) => {
      await updateGroup.mutateAsync(
        {id:group.id,
        data:{
        name: value.name,
        description: value.description,
      }});

      toast.success("Groupe modifié !");
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
          <DialogTitle>Modéfier Groupe</DialogTitle>
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
                <Label>Nom du Groupe</Label>
                <Input
                  placeholder="Groupe A"
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
                  placeholder="Ex: Informatique Licence 2"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={updateGroup.isPending}
          >
            {updateGroup.isPending ? "Modefication..." : "Modéfier le Groupe"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
