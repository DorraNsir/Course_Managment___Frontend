import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCourses } from "@/lib/mockData";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Calendar, User, FileText, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar role="student" />
        <div className="container py-8">
          <p>Cours non trouvé</p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    toast.success("Téléchargement du cours en cours...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar role="student" />
      <div className="container py-8 max-w-4xl">
        <Breadcrumb
          items={[
            { label: "Mes cours", href: "/student/dashboard" },
            { label: course.title },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{course.subject}</Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{course.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Enseignant</p>
                    <p className="font-medium">{course.teacher}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date de publication</p>
                    <p className="font-medium">
                      {new Date(course.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              </div>

              {course.hasSubmission && (
                <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <FileText className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Remise de travail requise</p>
                    <p className="text-sm text-muted-foreground">
                      Ce cours nécessite la remise d'un travail ou d'un devoir
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button onClick={handleDownload} className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger le cours
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/student/dashboard")}
                >
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
