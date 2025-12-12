import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Calendar, User, FileText, BookOpen, Upload, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

import { useGetCourseById } from "@/hooks/courses/useGetCoursesById";
import { useStudentSubmission } from "@/hooks/submissions/useGetSubmissionsByStudent";
import { useCreateSubmission } from "@/hooks/submissions/useCreateSubmission";
import { useDeleteSubmission } from "@/hooks/submissions/useDeleteSubmission";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const studentId = Number(localStorage.getItem("userId"));
  const { data: course } = useGetCourseById(Number(id));

  const { data: submission } = useStudentSubmission(course?.id, studentId);
  const createSubmission = useCreateSubmission();
  const deleteSubmission = useDeleteSubmission();

  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const isMissing =
    course?.hasSubmission && course?.deadline
      ? new Date(course.deadline) < new Date()
      : false;

  // Sync submission state from API
  useEffect(() => {
    setAlreadySubmitted(Boolean(submission?.filePath));
  }, [submission]);

  // -------- DRAG & DROP CONFIG --------
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSubmissionFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: isMissing,
  });

  // ---------- DOWNLOAD COURSE FILE ----------
  const handleDownload = async () => {
    try {
      if (!course?.filePath) {
        toast.error("Aucun fichier disponible pour ce cours.");
        return;
      }

      toast.loading("Téléchargement en cours...");

      const response = await fetch(`${import.meta.env.VITE_API_URL}${course.filePath}`);
      if (!response.ok) throw new Error("Erreur lors du téléchargement");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = course.filePath.split("/").pop() || "cours.pdf";
      link.click();

      toast.dismiss();
      toast.success("Téléchargement terminé !");
    } catch (err) {
      toast.dismiss();
      toast.error("Erreur lors du téléchargement.");
      console.error(err);
    }
  };

  // ---------- SUBMIT HOMEWORK ----------
  const handleSubmitHomework = async () => {
    try {
      if (!submissionFile) {
        toast.error("Veuillez sélectionner un fichier.");
        return;
      }

      toast.loading("Envoi de votre travail...");

      // Upload file
      const formData = new FormData();
      formData.append("file", submissionFile);

      const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Erreur lors du téléchargement du fichier");

      const uploadData = await uploadRes.json();
      const filePath = uploadData.filePath;

      // Save submission
      await createSubmission.mutateAsync({
        courseId: course!.id,
        studentId,
        filePath,
      });

      setSubmissionFile(null);
      setAlreadySubmitted(true);

      toast.dismiss();
      toast.success("Travail remis avec succès !");
    } catch (error) {
      toast.dismiss();
      toast.error("Erreur lors de la remise du travail.");
      console.error(error);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <p>Cours non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Mes cours", href: "/student/dashboard" },
            { label: course.title },
          ]}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{course.matiereName}</Badge>
                    </div>

                    {course.hasSubmission && (
                      <div className="flex">
                        {isMissing ? (
                          <span className="text-red-500 font-semibold">manquante</span>
                        ) : (
                          <span className="text-green-500 font-semibold">
                            {alreadySubmitted ? "Remis" : "À remettre"}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{course.description}</p>
              </div>

              {/* Teacher + Deadline */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Enseignant</p>
                    <p className="font-medium">{course.teacherName || "******"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date limite de remise</p>
                    <p className="font-medium">
                      {course.deadline?.split("T")[0] ?? "pas de date limite"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ---------------- SUBMISSION SECTION ---------------- */}
              {course.hasSubmission && (
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 space-y-4">

                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Remise de travail requise</p>

                      {alreadySubmitted ? (
                        <p className="text-sm text-green-600 font-semibold">
                          Travail déjà remis
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Veuillez téléverser votre devoir avant la date limite.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* If NOT submitted yet */}
                  {!alreadySubmitted ? (
                    <>
                      {/* True Drag & Drop Zone */}
                      <div
                        {...getRootProps()}
                        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition
                           ${
                             isMissing
                               ? "border-red-300 bg-red-50 cursor-not-allowed opacity-60"
                               : isDragActive
                               ? "border-primary bg-primary/10"
                               : "border-gray-300 hover:bg-muted cursor-pointer"
                           }`}
                      >
                        <input {...getInputProps()} />

                        <Upload className="h-8 w-8 text-primary mb-2" />

                        <p className="text-sm text-muted-foreground">
                          {isDragActive
                            ? "Déposez le fichier…"
                            : submissionFile
                            ? "Sélectionner un autre fichier"
                            : "Glisser-déposer un fichier ou cliquer pour sélectionner"}
                        </p>
                      </div>

                      {/* Preview */}
                      {submissionFile && (
                        <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                          {submissionFile.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(submissionFile)}
                              className="h-16 w-16 rounded object-cover border"
                            />
                          ) : (
                            <FileText className="h-10 w-10 text-primary" />
                          )}

                          <div className="flex-1">
                            <p className="font-medium">{submissionFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(submissionFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setSubmissionFile(null)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      )}

                      {/* Submit */}
                      <Button
                        onClick={handleSubmitHomework}
                        disabled={!submissionFile || isMissing}
                        className="w-full gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Remettre le travail
                      </Button>
                    </>
                  ) : (
                    // Already submitted
                    <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <span className="text-sm font-medium truncate">
                        {submission?.filePath?.split("/").pop()}
                      </span>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={async () => {
                          await deleteSubmission.mutateAsync(submission?.id);
                          setAlreadySubmitted(false);
                          toast.success("Remise supprimée !");
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex gap-4 pt-4">
                <Button onClick={handleDownload} className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger le cours
                </Button>

                <Button variant="outline" onClick={() => navigate("/student/dashboard")}>
                  Retour aux cours
                </Button>
              </div>


            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
