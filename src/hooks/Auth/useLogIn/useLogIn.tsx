import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Обов'язкове поле").email("Невірний формат email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function useLogIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = async () => {
    const basePath = window.location.pathname.startsWith("/event-booster") ? "/event-booster" : "";
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${basePath}/dashboard`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    if (error) {
      console.error("Виникла помилка:", error.message);
      toast.error("Не вдалося відкрити вікно Google");
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError("password", {
        type: "server",
        message: "Невірний логін або пароль",
      });
    } else {
      router.push("/dashboard");
      toast.success("Логін успішний");
    }
  };

  return {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleGoogleLogin,
    onSubmit,
  };
}
