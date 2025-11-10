import { ReactNode } from "react";
import { Icons } from "@/components/icons/Icons";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/60">
      {icon || (
        <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
          <Icons.Info className="h-8 w-8 text-zinc-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-zinc-700 dark:text-zinc-400">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}


