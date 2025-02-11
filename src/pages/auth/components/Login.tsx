import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button"; // Import the authLogin service

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useToast } from "../../../hooks/use-toast";
import { AuthenticationContext } from "../../../lib/services/authenticationContext/authentication.context";
import { AuthLogin } from "../lib/services/action";

const loginSchema = z.object({
  username: z.string().min(2, {
    message: "El nombre de usuario debe contener al menos 2 caracteres.",
  }),
  password: z
    .string()
    .min(6, "El password debe contener al menos 6 caracteres."),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = ({ isChange }: { isChange: () => void }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthenticationContext);
  const handleLogin = authContext?.handleLogin;

  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      console.log(data);
      const result = await AuthLogin(data);

      handleLogin?.(result);
      if (result) {
        console.log("Logueado con éxito", result);
        toast({
          variant: "success",
          title: "Logueo exitoso",
          description: "Seras redirigido al dashboard",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al loguearse",
        description: "Por favor, verifica tus credenciales.",
        status: "error",
      });
      console.log("Error al loguearse", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="w-96">
      <Card className="w-full">
        <div className="flex mx-auto justify-center items-center mt-4 border-2 rounded-lg size-12">
          <LogIn />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Inicio de sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="johnDoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid space-y-3">
                <Button className="w-full" type="submit">
                  Ingresar
                </Button>
                <Button variant="link" onClick={isChange}>
                  Si no tienes cuenta, regístrate.
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
