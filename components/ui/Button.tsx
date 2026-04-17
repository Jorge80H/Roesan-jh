import React from "react";
import { Link } from "lucide-react"; // Actually we might use Next.js Link text-to-href wrapping, but this is a button.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none ring-offset-background transition-all duration-200 active:scale-95";

    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-purple-600 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40",
        secondary: "bg-cyan-500 text-white hover:bg-cyan-600 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40",
        outline: "border-2 border-primary bg-background hover:bg-primary/5 hover:text-primary transition-all",
        ghost: "hover:bg-slate-100 hover:text-accent-foreground",
    };

    const sizes = {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-8 py-2 text-base",
        lg: "h-16 px-10 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
