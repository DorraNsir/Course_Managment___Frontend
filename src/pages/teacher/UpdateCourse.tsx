import { useState, useEffect } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@tanstack/react-form";

import { useAssignments } from "@/hooks/assignments/useAssignments";

import { useGetGroupById } from "@/hooks/groups/useGetGroupById";
import { useGetCourseById } from "@/hooks/courses/useGetCoursesById";
import { useUpdateCourse } from "@/hooks/courses/useUpdateCourses";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = Number(id);

  const { data: course } = useGetCourseById(courseId);
  const updateCourse = useUpdateCourse();

  // Only load group when course is available
  const { data: group } = useGetGroupById(course?.groupId);

  const { data: assignments } = useAssignments();
  const userId = Number(localStorage.getItem("userId"));

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasSubmission, setHasSubmission] = useState(false);

  // FORM
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

        const result =await updateCourse.mutateAsync({
          id: courseId,
          data: {
            title: value.title,
            description: value.description,
            hasSubmission: value.hasSubmission,
            matiereId: Number(value.matiereId),
            deadline: value.hasSubmission ? value.deadline : null,
            filePath: selectedFile ? selectedFile.name : course.filePath,
          },
        });
        toast.success("Cours modifié avec succès !");
        navigate(`/teacher/group/${course.groupId}`);
      } catch (err) {
        toast.error("Erreur lors de la modification du cours");
      }
    },
  });

  // Populate form once data is loaded
useEffect(() => {
  if (course) {
    form.reset({
      title: course.title,
      description: course.description,
      matiereId: String(course.matiereId),
      hasSubmission: course.hasSubmission,
      deadline: course.deadline ? course.deadline.split("T")[0] : "",
    });

    // FIX: sync local state with backend value
    setHasSubmission(course.hasSubmission);
  }
}, [course]);



  // Matieres taught by teacher in this group
  const teacherMatieres =
    assignments
      ?.filter(a => a.groupId === course?.groupId && a.teacherId === userId)
      .map(a => ({ id: a.matiereId, name: a.matiereName })) || [];

  if (!course) return <div className="p-10 text-center">Chargement du cours…</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8 max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Tableau de bord", href: "/teacher/dashboard" },
            { label: `${group?.name}_${group?.description}`, href: `/teacher/group/${course.groupId}` },
            { label: "Modifier le cours" },
          ]}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Modifier le cours</CardTitle>
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
                    <div>
                      <Label>Titre du cours</Label>
                      <Input
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
                      <Label>Description</Label>
                      <Textarea
                        rows={4}
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
                    <div>
                      <Label>Matière *</Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(v) => field.handleChange(v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={course?.matiereName} />
                        </SelectTrigger>
                        <SelectContent>
                          {teacherMatieres.map((m) => (
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
                    <div>
                      <Label>Type de cours</Label>
                      <RadioGroup
                        value={String(field.state.value)}
                        onValueChange={(v) => {
                          const b = v === "true";
                          field.handleChange(b);
                          setHasSubmission(b);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="false" id="no" />
                          <Label htmlFor="no">Sans remise</Label>
                        </div>

                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="true" id="yes" />
                          <Label htmlFor="yes">Avec remise</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                />

                {/* DEADLINE */}
                {hasSubmission && (
                  <form.Field
                    name="deadline"
                    children={(field) => (
                      <div>
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
                <div>
                  <Label>Fichier du cours</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    <Label htmlFor="file" className="cursor-pointer text-sm">
                      {selectedFile ? selectedFile.name : course.filePath || "Uploader un fichier"}
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={updateCourse.isPending} className="flex-1">
                    Modifier
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/teacher/group/${course.groupId}`)}
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

export default UpdateCourse;
