import { useState } from "react";
import type {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

type InputFieldProps<T extends FieldValues = any> = {
  label?: string;
  id: Path<T>;
  type?: string;
  register?: UseFormRegister<T>;
  error?: FieldError;
  className?: string;
  icon?: LucideIcon;
  placeholder?: string;
  value?: string | boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function Input<T extends FieldValues = any>({
  label,
  id,
  type = "text",
  register,
  error,
  className = "",
  icon: Icon,
  placeholder,
  value,
  defaultValue,
  onChange,
  required,
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isCheckBox = type === "checkbox";

  const registerProps = register
    ? register(id)
    : ({} as Partial<UseFormRegisterReturn>);

  return (
    <div className={`w-full ${isCheckBox ? "flex items-center gap-2" : ""}`}>
      {isCheckBox ? (
        <label className="inline-flex items-center cursor-pointer select-none group">
          <input
            id={id}
            type="checkbox"
            {...registerProps}
            value={value as any}
            onChange={onChange || registerProps.onChange}
            className="peer absolute w-5 h-5 opacity-0"
          />
          <div
            className={`w-5 h-5 border border-gray-300 dark:border-white/20 rounded-md
                        bg-white dark:bg-zinc-900 flex items-center justify-center
                        peer-checked:bg-pink-500 peer-checked:border-pink-500 transition-all duration-200 group-hover:scale-105 shadow-sm`}
          >
            <svg
              className="w-3 h-3 text-white dark:text-gray-900 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
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
          {label && (
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-pink-500 transition-colors">
              {label}
            </span>
          )}
        </label>
      ) : (
        <>
          {label && (
            <label
              htmlFor={id}
              className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="relative group">
            {Icon && (
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors duration-200 z-10">
                <Icon size={18} />
              </div>
            )}
            <input
              id={id}
              type={isPassword && showPassword ? "text" : type}
              placeholder={placeholder}
              {...registerProps}
              value={value as any}
              defaultValue={defaultValue}
              onChange={onChange || registerProps.onChange}
              className={`w-full ${Icon ? "pl-11" : "px-4"} py-2.5 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500
                transition-all duration-200 ${className} ${
                  error ? "border-red-400 focus:ring-red-400" : ""
                }`}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-400 hover:text-pink-500 transition-colors duration-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        </>
      )}

      {error && (
        <p className="text-red-500 text-[10px] sm:text-xs mt-1.5 font-bold uppercase tracking-wide">
          {error.message}
        </p>
      )}
    </div>
  );
}
