import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "outline" | "ghost";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl",
  secondary: "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200",
  outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
  ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const defaultStyles = "rounded-lg font-medium flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading, size = "md" }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${defaultStyles} ${fullWidth ? "w-full" : ""} ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
      disabled={loading}
    >
      {startIcon && <div className="mr-2">{startIcon}</div>}
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : (
        text
      )}
    </button>
  );
}
