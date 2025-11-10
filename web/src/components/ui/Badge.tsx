export function Badge({
  children,
  color = "primary",
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  color?: "primary" | "accent" | "success" | "warning" | "info";
  variant?: "default" | "outline" | "solid";
  className?: string;
}) {
  const colorClasses = {
    primary: {
      default: "bg-[var(--primary-50)] text-[var(--primary-700)] dark:bg-[var(--primary-900)]/30 dark:text-[var(--primary-400)]",
      outline: "border border-[var(--primary-300)] text-[var(--primary-700)] dark:border-[var(--primary-700)] dark:text-[var(--primary-400)]",
      solid: "bg-[var(--primary-600)] text-white",
    },
    accent: {
      default: "bg-[var(--accent-100)] text-[var(--accent-700)] dark:bg-red-900/30 dark:text-red-400",
      outline: "border border-red-300 text-red-700 dark:border-red-700 dark:text-red-400",
      solid: "bg-[var(--accent-600)] text-white",
    },
    success: {
      default: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      outline: "border border-green-300 text-green-700 dark:border-green-700 dark:text-green-400",
      solid: "bg-green-600 text-white",
    },
    warning: {
      default: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      outline: "border border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400",
      solid: "bg-amber-600 text-white",
    },
    info: {
      default: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      outline: "border border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400",
      solid: "bg-blue-600 text-white",
    },
  };

  const classes = colorClasses[color][variant];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${classes} ${className}`}>
      {children}
    </span>
  );
}


