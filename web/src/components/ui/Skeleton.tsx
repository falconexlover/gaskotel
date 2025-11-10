export function Skeleton({ className = "", ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`skeleton animate-pulse bg-zinc-200 dark:bg-zinc-800 ${className}`}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="mb-3">
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="mb-4 overflow-hidden rounded-lg border border-zinc-100 dark:border-zinc-800">
        <Skeleton className="aspect-[4/3] w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center mt-3">
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  );
}


