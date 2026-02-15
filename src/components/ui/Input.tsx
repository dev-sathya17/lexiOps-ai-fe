import { useState } from "react";
import type {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  id: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
};

export default function Input<T extends FieldValues>({
  label,
  id,
  type = "text",
  register,
  error,
  className,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isCheckBox = type === "checkbox";

  return (
    <div className={`${isCheckBox ? "flex items-center gap-2" : ""}`}>
      {isCheckBox ? (
        <label className="inline-flex items-center cursor-pointer select-none">
          <input
            id={id}
            type="checkbox"
            {...register(id)}
            className="peer absolute w-5 h-5 opacity-0"
          />
          <div
            className={`w-5 h-5 border border-gray-300 dark:border-white/30 rounded-md
                        bg-white/10 dark:bg-white/[0.02] flex items-center justify-center
                        peer-checked:bg-pink-500 peer-checked:border-pink-500 transition-all duration-150`}
          >
            <svg
              className="w-3 h-3 text-black dark:text-gray-900 opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="ml-2 text-gray-900 dark:text-gray-200">{label}</span>
        </label>
      ) : (
        <>
          <label
            htmlFor={id}
            className="block mb-1 font-medium text-gray-900 dark:text-gray-200"
          >
            {label}
          </label>
          <div className="relative">
            <input
              id={id}
              type={isPassword && showPassword ? "text" : type}
              {...register(id)}
              className={`w-full px-4 py-2 rounded pr-10 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400
                border border-gray-300 dark:border-white/10 bg-white/10 dark:bg-white/[0.02]
                focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                transition-colors duration-200 ${className} ${
                error ? "border-red-400 focus:ring-red-400" : ""
              }`}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-2.5 right-3 text-gray-500 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
        </>
      )}

      {error && (
        <p className="text-red-400 text-sm mt-1 font-semibold">
          {error.message}
        </p>
      )}
    </div>
  );
}
