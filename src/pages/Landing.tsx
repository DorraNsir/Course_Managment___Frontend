import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();
    useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "admin") navigate("/admin/dashboard");
      if (role === "teacher") navigate("/teacher/dashboard");
      if (role === "student") navigate("/student/dashboard");
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-muted/30">

      {/* 🌊 Animated Wave Background */}
      <img
        src="/bg-waves.svg"
        alt="wave background"
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-4 py-16">
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

        <div className="max-w-xl mx-auto">
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
                      <Users className="h-12 w-12 text-accent" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Connexion</h2>
                    <p className="text-muted-foreground mb-6">
                      Accéder à votre espace universitaire
                    </p>
                  </div>

                  <Button
                    onClick={() => navigate("/login")}
                    className="w-full"
                    size="lg"
                    variant="secondary"
                  >
                    Se connecter
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
