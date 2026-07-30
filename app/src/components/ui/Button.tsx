import type { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "line" | "ink";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn--primary",
  line: "btn--line",
  ink: "btn--ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  const classes = [
    "btn",
    variantClass[variant],
    size === "sm" ? "btn--sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  );
}
