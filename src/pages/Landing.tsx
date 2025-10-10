import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <BookOpen className="h-16 w-16 text-primary" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            ITBSCourse
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plateforme moderne de gestion des cours universitaires
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-primary/10">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Enseignant</h2>
                    <p className="text-muted-foreground mb-6">
                      Gérez vos cours et vos groupes d'étudiants
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate("/login?role=teacher")}
                    className="w-full"
                    size="lg"
                  >
                    Connexion Enseignant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-accent/10">
                      <GraduationCap className="h-12 w-12 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Étudiant</h2>
                    <p className="text-muted-foreground mb-6">
                      Accédez à vos cours et ressources pédagogiques
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate("/login?role=student")}
                    className="w-full"
                    size="lg"
                    variant="secondary"
                  >
                    Connexion Étudiant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-sm text-muted-foreground"
        >
          <p>Plateforme de démonstration - Données fictives</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
