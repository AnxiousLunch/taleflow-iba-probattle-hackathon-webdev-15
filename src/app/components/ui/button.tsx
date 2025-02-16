import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost"; // Define allowed values for `variant`
}

export function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const variantClasses: Record<ButtonProps["variant"], string> = {
    default: "bg-blue-600 hover:bg-blue-700",
    ghost: "bg-transparent hover:bg-gray-700",
  };

  return (
    <button
      className={`px-4 py-2 rounded-md text-white ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
