import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";

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
import { AuthRegister } from "../lib/services/action";

const registerSchema = z.object({
  username: z.string().min(2, {
    message: "El nombre de usuario debe contener al menos 2 caracteres.",
  }),
  password: z
    .string()
    .min(6, "El password debe contener al menos 6 caracteres."),
  email: z.string().email(),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = ({ isChange }: { isChange: () => void }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const result = await AuthRegister(data);

      if (result) {
        toast({
          variant: "success",
          title: "Registro exitoso",
          description: "Seras redirigido al login para iniciar sesión",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al registrarse",
        description: "Por favor, verifica tus credenciales.",
        status: "error",
      });
      console.log("Error al registrar usuario", error);
    }
  };

  return (
    <div className="w-96">
      <Card className="w-full">
        <div className="flex mx-auto justify-center items-center mt-4 border-2 rounded-lg size-12">
          <UserPlus />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Registro</CardTitle>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@mail.com" {...field} />
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
                  Registrarme
                </Button>
                <Button variant="link" onClick={isChange}>
                  Si ya tienes cuenta, inicia sesión.
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
