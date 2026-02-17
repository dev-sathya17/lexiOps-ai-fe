import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "../../assets/icons/google.svg";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loader from "../../components/ui/Loader";
import { STEPS } from "../../constants/steps";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be no more than 20 characters")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[0-9]/, "Password must include a number")
    .regex(/[^a-zA-Z0-9]/, "Password must include a special character"),
  keepMeSignedIn: z.boolean().optional(),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 50));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "LexiOps AI - Login";
  }, []);

  const onSubmit = (data: LoginSchema) => {
    console.log("Login Data:", data);
  };

  return (
    <>
      {progress === 100 ? (
        <>
          <Header />
          <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-black transition-colors duration-300">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md w-full mx-auto px-4 py-6 md:p-8 rounded-2xl
                         bg-linear-to-br from-white/10 to-gray-50/5 dark:from-zinc-900 dark:to-black
                         shadow-lg border border-zinc-300 dark:border-zinc-800 space-y-5 backdrop-blur-sm
                         transition-colors duration-300"
            >
              {/* Title */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-gray-200">
                  Welcome back to LexiOps AI 👋
                </h2>
                <p className="text-sm md:text-md text-center text-gray-500 dark:text-gray-400 mt-2">
                  Let's get you signed in
                </p>
              </section>

              {/* OAuth with Google Section */}
              <section>
                <Button
                  variant="secondary"
                  className="w-full gap-2 font-semibold"
                >
                  <img src={GoogleIcon} alt="google-logo" className="w-6 h-6" />
                  <span>Sign in with Google</span>
                </Button>
              </section>

              {/* Divider */}
              <div className="flex items-center space-x-4">
                <hr className="grow border-gray-300 dark:border-white/10" />
                <span className="text-gray-400 dark:text-gray-500 text-sm">
                  or
                </span>
                <hr className="grow border-gray-300 dark:border-white/10" />
              </div>

              {/* Email */}
              <Input<LoginSchema>
                label="Email"
                id="email"
                type="email"
                register={register}
                error={errors.email}
              />

              {/* Password */}
              <Input<LoginSchema>
                label="Password"
                id="password"
                type="password"
                register={register}
                error={errors.password}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full font-bold"
              >
                Sign In
              </Button>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between w-full">
                <Input<LoginSchema>
                  label="Remember Me"
                  id="keepMeSignedIn"
                  type="checkbox"
                  register={register}
                  error={errors.keepMeSignedIn}
                />
                <NavLink
                  to="/forgot-password"
                  className="w-full text-right text-pink-500 dark:text-pink-400 hover:underline text-sm"
                >
                  Forgot Password?
                </NavLink>
              </div>

              {/* Navigation Section */}
              <div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <NavLink
                    to="/sign-up"
                    className="font-semibold text-pink-500 dark:text-pink-400 hover:underline"
                  >
                    Sign Up
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Loader steps={STEPS.AUTH} progress={progress} />
      )}
    </>
  );
};

export default Login;
