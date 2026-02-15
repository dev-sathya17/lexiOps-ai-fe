import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[0-9]/, "Password must include a number")
      .regex(/[^a-zA-Z0-9]/, "Password must include a special character"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[0-9]/, "Password must include a number")
      .regex(/[^a-zA-Z0-9]/, "Password must include a special character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    document.title = "LexiOps AI - Reset Password";
  }, []);

  const onSubmit = (data: ResetPasswordSchema) => {
    console.log("Reset Password Data:", data);
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
                     transition-colors duration-300"
        >
          {/* Title */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-gray-200">
              Reset your password 🔑
            </h2>
            <p className="text-sm md:text-md text-center text-gray-400 mt-2">
              Choose a new password to secure your account
            </p>
          </section>

          {/* Password */}
          <Input<ResetPasswordSchema>
            label="Password"
            id="password"
            type="password"
            register={register}
            error={errors.password}
          />

          {/* Confirm Password */}
          <Input<ResetPasswordSchema>
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />

          {/* Submit Button */}
          <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold w-full">
            <p>Reset Password</p>
          </Button>

          {/* Navigation Section */}
          <div>
            <p className="text-center text-sm text-gray-400">
              Know your password?{" "}
              <NavLink
                to="/login"
                className="font-semibold text-pink-500 dark:text-pink-400 hover:underline"
              >
                Sign In
              </NavLink>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
