import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  hover?: boolean;
}

export default function GradientCard({ 
  children, 
  variant = "primary", 
  className, 
  hover = false 
}: GradientCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 shadow-lg",
        {
          "gradient-card-primary": variant === "primary",
          "gradient-card-secondary": variant === "secondary", 
          "gradient-card-accent": variant === "accent",
          "hover-glow cursor-pointer": hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
}