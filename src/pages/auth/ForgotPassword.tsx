import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChevronLeft } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    document.title = "LexiOps AI - Forgot Password";
  }, []);

  const onSubmit = (data: ForgotPasswordSchema) => {
    console.log("Forgot Password Data:", data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black transition-colors duration-300">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md px-6 py-8 md:p-10 rounded-2xl
                     bg-linear-to-br from-white/10 to-gray-50/5 dark:from-zinc-900 dark:to-black
                     shadow-lg border border-zinc-300 dark:border-zinc-800 space-y-6 backdrop-blur-sm
                     transition-colors duration-300 overflow-hidden"
        >
          {/* Title */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-gray-200">
              Forgot your password? 🔒
            </h2>
            <p className="text-sm md:text-md text-center text-gray-500 dark:text-gray-400 mt-2">
              No worries — we'll help you reset it
            </p>
          </section>

          {/* Email */}
          <Input<ForgotPasswordSchema>
            label="Email"
            id="email"
            type="email"
            register={register}
            error={errors.email}
          />

          {/* Submit Button */}
          <Button className="bg-pink-600 hover:bg-pink-700 dark:text-white font-semibold w-full">
            <p>Reset Password</p>
          </Button>

          {/* Navigation Section */}
          <div>
            <NavLink
              to="/login"
              className="flex items-center justify-center w-full font-semibold text-pink-500 dark:text-pink-400 hover:underline gap-1"
            >
              <ChevronLeft />
              <p className="text-center text-sm">Back to Sign In</p>
            </NavLink>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
