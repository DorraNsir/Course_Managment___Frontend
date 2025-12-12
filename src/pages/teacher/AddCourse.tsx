import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useAssignments } from "@/hooks/assignments/useAssignments";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useGetGroupById } from "@/hooks/groups/useGetGroupById";
import { useCreateCourse } from "@/hooks/courses/useCreateCourses";
import { api } from "@/api/axiosInstance";

const AddCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const groupId = Number(id);
  const createCourse = useCreateCourse();
  const {data:group}=useGetGroupById(groupId)
  const { data: assignments } = useAssignments();
  const userId = Number(localStorage.getItem("userId"));
  const [hasSubmission, setHasSubmission] = useState(false);
    // For file name storing
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Get all matieres this teacher teaches in this group
  const teacherMatieresInGroup =
    assignments
      ?.filter((a) => a.groupId === groupId && a.teacherId === userId)
      .map((a) => ({ id: a.matiereId, name: a.matiereName })) || [];

  const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

    return res.data.filePath; // /files/courses/xxx.pdf
  };

  // FORM SETUP
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      matiereId: "",
      hasSubmission: false,
      deadline: "",
    },

    onSubmit: async ({ value }) => {
      try {
        if (value.hasSubmission && value.deadline) {
          const selectedDate = new Date(value.deadline);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Remove time for clean comparison

          if (selectedDate < today) {
            toast.error("La date limite ne peut pas être dans le passé.");
            return; // ❌ Stop submit completely
          }
        }

        let uploadedPath = null;
        if (selectedFile) {
          uploadedPath = await uploadFile(selectedFile);
        }

        await createCourse.mutateAsync({
          title: value.title,
          description: value.description,
          matiereId: Number(value.matiereId),
          teacherId: userId,
          groupId: groupId,
          hasSubmission: value.hasSubmission ,
          deadline: value.hasSubmission ? value.deadline : null,
          filePath: uploadedPath || null,
        });

        toast.success("Cours créé avec succès !");
        navigate(`/teacher/group/${groupId}`);
      } catch (err: any) {
        console.error(err);
        toast.error("Erreur lors de la création du cours");
      }
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8 max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Tableau de bord", href: "/teacher/dashboard" },
            { label: `${group.name}_${group.description}`,href:`/teacher/group/${groupId}` },
            { label: "Ajouter un cours" },
          ]}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Nouveau Cours</CardTitle>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                {/* TITLE */}
                <form.Field
                  name="title"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label>Titre du cours *</Label>
                      <Input
                        placeholder="Ex: Réseaux Informatiques 1"
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
                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea
                        rows={4}
                        placeholder="Décrivez le contenu du cours…"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                />

                {/* MATIERE */}
                <form.Field
                  name="matiereId"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label>Matière *</Label>

                      <Select
                        value={field.state.value}
                        onValueChange={(v) => field.handleChange(v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une matière" />
                        </SelectTrigger>

                        <SelectContent>
                          {teacherMatieresInGroup.map((m) => (
                            <SelectItem key={m.id} value={String(m.id)}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                {/* HAS SUBMISSION */}
                <form.Field
                  name="hasSubmission"
                  children={(field) => (
                    <div className="space-y-3">
                      <Label>Type de cours *</Label>
                      <RadioGroup
                        value={String(field.state.value)}
                        onValueChange={(v) => {
                          const boolValue = v === "true";
                          field.handleChange(boolValue);   // update TanStack Form
                          setHasSubmission(boolValue);     // update your local state
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="no" />
                          <Label htmlFor="no">Sans remise de travail</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="yes" />
                          <Label htmlFor="yes">Avec remise de travail</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                />

                {/* DEADLINE (ONLY IF true) */}
                {hasSubmission  && (
                  <form.Field
                    name="deadline"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label>Date limite</Label>
                        <Input
                          type="date"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    )}
                  />
                )}

                {/* FILE UPLOAD */}
                <div className="space-y-2">
                  <Label>Fichier du cours</Label>

                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />

                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                    />

                    <Label htmlFor="file" className="cursor-pointer text-sm">
                      {selectedFile ? selectedFile.name : "Uploader un fichier"}
                    </Label>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={createCourse.isPending}
                  >
                    {createCourse.isPending ? "Création..." : "Enregistrer"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/teacher/dashboard")}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCourse;

