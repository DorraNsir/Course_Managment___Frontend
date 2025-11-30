import { useLogin } from "@/hooks/Auth/useAuth";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      try {
        const result = await login.mutateAsync({
          email: value.email,
          password: value.password,
        });
        console.log(result)
          // Business validation
        if (!result?.success) {
          toast.error(result.message || "Erreur de connexion");
          return;
        }
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);
        localStorage.setItem("userId", result.userId);
        

        toast.success("Connexion réussie !");
        if (result.role === "admin") {
          navigate("/admin/dashboard");
        } else if (result.role === "teacher") {
          navigate("/teacher/dashboard");
        } else if (result.role === "student") {
          navigate("/student/dashboard");
        }
      } catch (error: any) {
        // Network / server / CORS errors
        console.error("LOGIN ERROR:", error);
        const backendMessage =
          error?.response?.data?.message ||
          error?.response?.data ||
          "Erreur lors de la connexion";

        toast.error(backendMessage);
      }
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <img
        src="/bg-waves.svg"
        alt="background waves"
        className="absolute bottom-0 left-0 w-full -z-10 opacity-80"
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
            <CardDescription>Connectez-vous à votre espace</CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              {/* Email */}
              <form.Field
                name="email"
                children={(field) => (
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="exemple@universite.fr"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />

              {/* Password */}
              <form.Field
                name="password"
                children={(field) => (
                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={login.isPending}
              >
                {login.isPending ? "Connexion..." : "Se connecter"}
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
