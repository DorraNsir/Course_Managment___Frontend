import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get("role") as "teacher" | "student" | null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "student">(preselectedRole || "student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    toast.success("Connexion réussie !");
    
    if (role === "teacher") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="relative  min-h-screen overflow-hidden  flex items-center justify-center p-4">
    
    <img
      src="/bg-waves.svg"
      alt="wave background"
      className="absolute bottom-0 left-0 w-full pointer-events-none select-none -z-10"
    />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">ITBSCourse</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre espace {role === "teacher" ? "enseignant" : "étudiant"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Rôle</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={role === "student" ? "default" : "outline"}
                    onClick={() => setRole("student")}
                    className="w-full"
                  >
                    Étudiant
                  </Button>
                  <Button
                    type="button"
                    variant={role === "teacher" ? "default" : "outline"}
                    onClick={() => setRole("teacher")}
                    className="w-full"
                  >
                    Enseignant
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@universite.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Se connecter
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Retour à l'accueil
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
