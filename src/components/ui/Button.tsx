import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: LucideIcon;
}

export default function Button({
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  icon: Icon,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/20 active:scale-[0.98]",
    secondary:
      "bg-white/10 dark:bg-white/5 hover:bg-white/20 text-gray-900 dark:text-gray-200 border border-zinc-200 dark:border-white/10 active:scale-[0.98]",
    danger:
      "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 active:scale-[0.98]",
    outline:
      "bg-transparent border border-pink-500/50 hover:border-pink-500 text-pink-500 hover:bg-pink-500/5 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`cursor-pointer inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
              focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-black
              ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={size === "sm" ? 14 : 18} />}
          {children}
        </>
      )}
    </button>
  );
}
