import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "line" | "ink";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const baseClass = cn(
  "inline-flex items-center gap-2.5 whitespace-nowrap rounded-pill border",
  "text-btn font-semibold transition-[background,transform,border-color,color] duration-300 ease-brand",
  "hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-burgundy",
);

const variantClass: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-sage text-moss hover:bg-sage-hover",
  line: "border-white/50 text-white hover:border-white hover:bg-white/14",
  ink: "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
};

const sizeClass = {
  md: "px-[30px] py-4",
  sm: "px-6 py-[14px] text-btn-sm",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(baseClass, variantClass[variant], sizeClass[size], className)}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
