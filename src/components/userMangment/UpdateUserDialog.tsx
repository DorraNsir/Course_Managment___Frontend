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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useState } from "react";
import { Edit } from "lucide-react";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";
export function UpdateUserDialog({ groups,user }) {

  const updateUser = useUpdateUser();
  const [role, setRole] = useState(user.role || "");
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      role: user.role || "",
      groupId: user.groupId ? String(user.groupId) : "",
      password:"", 
    },
    
    onSubmit: async ({ value }) => {
      await updateUser.mutateAsync({
        id:user.id,
        data:{
        fullName: value.fullName,
        email: value.email,
        role: value.role,
        groupId: value.role === "student" ? Number(value.groupId) : null,
        password:value.password,
      }
    });
    console.log("User updated:", value);

      toast.success("Utilisateur modifié !");
      form.reset();     // reset form
      setOpen(false);   // CLOSE DIALOG
    }, 
    
  });
 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier utilisateur</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4 pt-4"
        >
          {/* Full Name */}
          <form.Field
            name="fullName"
            children={(field) => (
              <div className="space-y-1">
                <Label>Nom complet</Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
            )}
          />

          {/* Email */}
          <form.Field
            name="email"
            children={(field) => (
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="john@example.com"
                />
              </div> 
            )}
          />

                    {/* Email */}
          <form.Field
            name="password"
            children={(field) => (
              <div className="space-y-1">
                <Label>Mot de passe</Label>
                <Input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="*******"
                />
              </div> 
            )}
          />

          {/* Role */}
          <form.Field
            name="role"
            children={(field) => (
              <div className="space-y-1">
                <Label>Rôle</Label>
                <Select
                      onValueChange={(v) => {
                      field.handleChange(v);
                      setRole(v);
                    }}
                  
                  value={field.state.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Enseignant</SelectItem>
                    <SelectItem value="student">Étudiant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          
          {/* Group selector only for students */}
          {role === "student" && (
            <form.Field
              name="groupId"
              children={(field) => (
                <div className="space-y-1">
                  <Label>Groupe</Label>
                  <Select
                    onValueChange={(v) => field.handleChange(v)}
                    value={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un groupe" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups?.map((g) => (
                        <SelectItem key={g.id} value={String(g.id)}>
                          {g.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={updateUser.isPending}
          >
            {updateUser.isPending ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
