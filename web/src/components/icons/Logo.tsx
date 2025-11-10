export function Logo({ className = "w-32 h-8 text-[var(--primary-700)] dark:text-[var(--primary-400)]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Котел символ */}
      <rect x="0" y="6" width="32" height="20" rx="4" fill="currentColor" className="transition-colors"/>
      <path d="M8 16h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="16" cy="10" r="2" fill="white" opacity="0.9"/>
      <path d="M8 22h16" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      
      {/* Текст */}
      <text
        x="38"
        y="20"
        fontFamily="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        fontSize="18"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="-0.04em"
      >
        ЖМЗ
      </text>
      
      {/* Декоративная линия */}
      <line x1="38" y1="24" x2="135" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"/>
    </svg>
  );
}

