export function PlaceholderProduct({ className = "w-10 h-10 text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="14" rx="2" fill="currentColor" opacity="0.25" />
      <circle cx="8" cy="9" r="2" fill="currentColor" />
      <path d="M3 16l4-4 5 5 3-3 6 6H3z" fill="currentColor" />
    </svg>
  );
}

export function PlaceholderCategory({ className = "w-8 h-8 text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="3" y="13" width="18" height="8" rx="2" fill="currentColor" />
    </svg>
  );
}

export function PlaceholderDoc({ className = "w-5 h-5 text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="currentColor" opacity="0.25" />
      <path d="M14 3v5h5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8M8 16h8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}


