export function FactoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 20h18v-6l-4-2v2l-4-2v2l-4-2v8H3z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 20v-4m4 4v-4m4 4v-4m4 4v-4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 6a4 4 0 1 0 4 4l3-3-3-3-4 2zM4 20l6-6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="4" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function DocIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 3h7l5 5v13H7V3z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}


