export function Logo({ className = "w-24 h-6 text-[var(--primary-700)]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="4" width="28" height="16" rx="3" fill="currentColor"/>
      <path d="M6 12h16" stroke="white" strokeWidth="2"/>
      <text x="36" y="16" fontFamily="system-ui, -apple-system, Segoe UI, Roboto" fontSize="12" fill="currentColor">Газкотел</text>
    </svg>
  );
}


