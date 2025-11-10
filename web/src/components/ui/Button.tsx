import { ComponentProps, ReactNode } from "react";
import { Icons } from "@/components/icons/Icons";

type ButtonProps = ComponentProps<"button"> & { 
  asChild?: false;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({ 
  className = "", 
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={
        `inline-flex items-center justify-center gap-2 rounded-md bg-[var(--primary-600)] text-white shadow-sm transition-all duration-200 hover:bg-[var(--primary-700)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] focus:ring-offset-2 active:bg-[var(--primary-800)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 ${sizeClasses[size]} ` +
        className
      }
    >
      {loading && <Icons.Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

export function ButtonSecondary({ 
  className = "", 
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={
        `inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-soft)] bg-[var(--surface-base)] text-[var(--primary-700)] shadow-sm transition-all duration-200 hover:bg-[var(--primary-50)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] focus:ring-offset-2 active:bg-[var(--primary-100)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 dark:bg-[var(--surface-muted)] dark:text-[var(--primary-200)] dark:border-[var(--border-soft)] dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_16%,var(--surface-muted))] ${sizeClasses[size]} ` +
        className
      }
    >
      {loading && <Icons.Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

export function ButtonOutline({ 
  className = "", 
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={
        `inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-soft)] bg-transparent text-zinc-800 transition-all duration-200 hover:bg-[var(--primary-50)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] focus:ring-offset-2 active:bg-[var(--primary-100)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 dark:text-[var(--primary-100)] dark:border-[var(--border-soft)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_14%,transparent)] ${sizeClasses[size]} ` +
        className
      }
    >
      {loading && <Icons.Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

export function ButtonGhost({ 
  className = "", 
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={
        `inline-flex items-center justify-center gap-2 rounded-lg bg-transparent text-[var(--primary-700)] transition-all duration-200 hover:bg-[color-mix(in_oklab,var(--primary-500)_12%,transparent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] focus:ring-offset-2 active:bg-[color-mix(in_oklab,var(--primary-600)_16%,transparent)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 dark:text-[var(--primary-100)] ${sizeClasses[size]} ` +
        className
      }
    >
      {loading && <Icons.Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

