import { useForm } from "react-hook-form";
import { z } from "zod";

import GoogleIcon from "../../assets/icons/google.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loader from "../../components/ui/Loader";
import { STEPS } from "../../constants/steps";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^[0-9]{10,15}$/, "Enter a valid mobile number"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be no more than 20 characters")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^a-zA-Z0-9]/, "Must include a special character"),
});

type SignUpSchema = z.infer<typeof signupSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 50));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "LexiOps AI - Sign Up";
  }, []);

  const onSubmit = (data: SignUpSchema) => {
    console.log("Sign Up Data:", data);
  };

  return (
    <>
      {progress === 100 ? (
        <>
          <Header />
          <div
            className="min-h-screen flex items-center justify-center px-4 sm:py-12 md:py-9
                      bg-linear-to-br from-white via-gray-50 to-white dark:from-black dark:via-zinc-950 dark:to-black transition-colors duration-300"
          >
            <form
              className="max-w-xl w-full mx-auto px-4 py-6 md:p-8 rounded-2xl
                         bg-linear-to-br from-white/10 to-gray-50/5 dark:from-zinc-900 dark:to-black
                         shadow-lg border border-zinc-300 dark:border-zinc-800 space-y-5 backdrop-blur-sm
                         transition-colors duration-300"
            >
              {/* Title */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                  Get started with LexiOps AI
                </h2>
                <p className="text-sm md:text-md text-center text-gray-500 dark:text-gray-400 mt-2">
                  Create your free account and query your internal knowledge
                  securely with AI!
                </p>
              </section>

              {/* OAuth with Google Section */}
              <section>
                <Button className="space-x-2 font-semibold bg-white/10 hover:bg-white/20 text-gray-800 dark:text-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-zinc-700 dark:border-zinc-600 transition-colors duration-300">
                  <img src={GoogleIcon} alt="google-logo" className="w-7 h-7" />
                  <p>Sign in with Google</p>
                </Button>
              </section>

              {/* Divider */}
              <div className="flex items-center space-x-4">
                <hr className="grow border-zinc-300 dark:border-zinc-700" />
                <span className="text-gray-400 dark:text-gray-500 text-sm">
                  or
                </span>
                <hr className="grow border-zinc-300 dark:border-zinc-700" />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <Input<SignUpSchema>
                    label="First Name"
                    id="firstName"
                    type="text"
                    register={register}
                    error={errors.firstName}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Input<SignUpSchema>
                    label="Last Name"
                    id="lastName"
                    type="text"
                    register={register}
                    error={errors.lastName}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <Input<SignUpSchema>
                    label="Username"
                    id="username"
                    type="text"
                    register={register}
                    error={errors.username}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Input<SignUpSchema>
                    label="Mobile"
                    id="mobile"
                    type="tel"
                    register={register}
                    error={errors.mobile}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <Input<SignUpSchema>
                    label="Email"
                    id="email"
                    type="email"
                    register={register}
                    error={errors.email}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Input<SignUpSchema>
                    label="Password"
                    id="password"
                    type="password"
                    register={register}
                    error={errors.password}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit(onSubmit)}
                className="bg-pink-600 font-semibold hover:bg-pink-700 text-white w-full transition-colors duration-300"
              >
                <p>Sign Up</p>
              </Button>

              {/* Navigation Section */}
              <div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className=" font-semibold text-pink-500 hover:underline"
                  >
                    Sign In
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Loader steps={STEPS.ONBOARDING} progress={progress} />
      )}
    </>
  );
};

export default SignUp;
